'use strict';
import systemet from 'systemet';
import Store from '../models/stores';
import Product from '../models/products';
import cheerio from 'cheerio';
import fetch from "node-fetch";

let storeNrs = [];
let sthlmStores = [];
let $ = null;

// Saves all products to the database.
const saveProductsToDB = products => {
  return new Promise((resolve, reject) => {
    console.log('saveProductsToDB():\tSaving products to database...');
    products.map(product => {
      const myProduct = new Product({
        _id: Number(product.articleId),
        nr: product.nr,
        name1: product.name,
        name2: product.nameExtra,
        category: product.category,
        price: product.price,
        volume: product.volume,
        package: product.packaging,
        alcohol: product.alcohol,
        producer: product.producer
      });
      Product.replaceOne({_id: myProduct._id}, myProduct, {upsert: true},  (err, raw) => {
        if (err) reject(err);
      });
    });
    console.log('saveProductsToDB():\tProducts saved to DB!')
    resolve();
  });
}

// Saves all stores in Stockholms Län to the database
const saveStoresToDB = stores => {
  return new Promise((resolve, reject) => {
    console.log('saveStoresToDB():\tSaving stores to database...');
    stores.map(store => {
      if (store.type === 'Butik' && store.county === 'Stockholms län') {
        const myStore = new Store({
          _id: store.nr,
          name: store.name,
          street: store.address,
          postalCode: store.zipCode,
          city: store.city,
          rt90x: store.rt90.x,
          rt90y: store.rt90.y,
          openingHours: store.openingHours,
        });        
        Store.replaceOne({_id: myStore._id}, myStore, {upsert: true},  (err, raw) => {
          if (err) reject(err);
        })
        storeNrs.push(store.nr);
      }
    });
    console.log('saveStoresToDB():\tStores saved to DB!');
    resolve(storeNrs);
  });
}

// Fetches all products from Systembolagets API and saves to our database.
const loadAllProducts = async () => {
  console.log('loadAllProducts():\tProducts loading...');
  const products = await systemet.products()
  console.log('loadAllProducts():\tProducts loaded!');
  return saveProductsToDB(products);
}

// Fetches all stores from Systembolagets API and saves to our database.
const loadAllStores = async () => {
  storeNrs = [];
  console.log('loadAllStores():\tStores loading...');
  const stores = await systemet.stores()
  console.log('loadAllStores():\tStores loaded!');
  return saveStoresToDB(stores);
}

// Loads the stock xml file from Systembolagets API into the cheerio $ object
const loadAllStocks = () => {
  return new Promise(async (resolve, reject) => {
    console.log('loadAllStocks():\tStocks loading...fetching from Systembolaget\'s API');
    const res = await fetch('http://www.systembolaget.se/api/assortment/stock/xml');
    const data = await res.text();
    console.log('loadAllStocks():\tLoading Stocks into $...');
    $ = cheerio.load(data, {
      normalizeWhitespace: true,
      xmlMode: true
    });
    console.log('loadAllStocks():\tFiltering out stock information for stores in Stockholms Län...');
    sthlmStores = $('Butik').filter((i, butik) => {
      return storeNrs.includes($(butik).attr('ButikNr'));
    })
    console.log('loadAllStocks():\tStocks loaded!');
    resolve(sthlmStores);
  });
  // let sTs = findStoresWithGivenProductNrs(['8685501', '141212']); //141212 Norrlands, 8685501 Kraken, 8608901 Tequila
}

export const getStoresWithProducts = async productNrs => {
  let storeNrsWithGivenProducts = await findStoresWithGivenProductNrs(productNrs); //141212 Norrlands, 8685501 Kraken, 8608901 Tequila
  // console.log(`getStoresWithProducts():\tStore numbers with given products: `, storeNrsWithGivenProducts);
  let finalStores = [];
  await Promise.all(storeNrsWithGivenProducts.map(storeNr => {
    return findStore(storeNr)
      .then(store => finalStores.push(store));
  }));
  // console.log('getStoresWithProducts():\tFinal Stores: ', finalStores);
  return finalStores;
}

// Updates the database with the latest .xml files from Systembolagets API
export const updateAPIfromSystemet = async () => {
  let storesAndStock = new Promise(async (resolve, reject) => {
    await loadAllStores(),
    await loadAllStocks();
    console.log('updateAPIfromSystemet():\tFinished loading Stores and Stocks');
    resolve();
  });
  return Promise.all([
    storesAndStock,
    // loadAllProducts()
  ])
}

export const findStoresWithGivenProductNrs = productNrs => {
  console.log(`findStoresWithGivenProductNrs():\tfindStoresWithGivenProductNrs - searching through ${sthlmStores.length} stores in Stockholm...`);
  const timeBefore = Date.now();

  return new Promise((resolve, reject) => {
    let matchesToReturn = []; // The return object, the matching stores
    let matchingStores = sthlmStores;
    console.log('findStoresWithGivenProductNrs():\tMatching Stores:', matchingStores.length);
    console.log('findStoresWithGivenProductNrs():\tProduct Numbers:', productNrs);
    productNrs.map(productNr => {
      matchingStores = $(matchingStores).filter((i, store) => {
        let result = false;
        $(store).children().each((j, artikel) => {
          let artikelNr = $(artikel).text();
          if (artikelNr == productNr) {
            result = true;
            return false;
          }
        })
        return result;
      });
    })
    // console.log('findStoresWithGivenProductNrs():\tMatching Stores after', matchingStores.length);
    const totalTime = Date.now() - timeBefore;
    console.log('findStoresWithGivenProductNrs():\tTotal query time:', totalTime);
    $(matchingStores).map((k, match) => {
      const itsAMatch = $(match).attr('ButikNr');
      // console.log('findStoresWithGivenProductNrs():\tBUTIKnr:', itsAMatch);
      matchesToReturn.push(itsAMatch);
    })
    console.log(`findStoresWithGivenProductNrs():\tMatches (${matchesToReturn.length}) to return:`, matchesToReturn);
    resolve(matchesToReturn);
  })
}

export const findStore = storeNr => {
  return new Promise((resolve, reject) => {
    Store.findById(storeNr, (err, store) => {
      if(err) reject(err);
      resolve(store);
    })
  })
}