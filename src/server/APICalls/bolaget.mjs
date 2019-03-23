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
const saveProductsToDB = (products) => {
  return new Promise((resolve, reject) => {
    console.log('Saving products to database...');
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
    console.log('Products saved to DB!')
    resolve();
  });
}

// Saves all stores in Stockholms Län to the database
const saveStoresToDB = (stores) => {
  return new Promise((resolve, reject) => {
    console.log('Saving stores to database...');
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
    console.log('Stores saved to DB!');
    resolve(storeNrs);
  });
}

// Fetches all products from Systembolagets API and saves to our database.
const loadAllProducts = async () => {
  console.log('Products loading...');
  const products = await systemet.products()
  console.log('Products loaded!');
  return saveProductsToDB(products);
}

// Fetches all stores from Systembolagets API and saves to our database.
const loadAllStores = async () => {
  storeNrs = [];
  console.log('Stores loading...');
  const stores = await systemet.stores()
  console.log('Stores loaded!');
  return saveStoresToDB(stores);
}

// Loads the stock xml file from Systembolagets API into the cheerio $ object
const loadAllStocks = () => {
  return new Promise(async (resolve, reject) => {
    console.log('Stocks loading...fetching from Systembolaget\'s API');
    const res = await fetch('http://www.systembolaget.se/api/assortment/stock/xml');
    const data = await res.text();
    console.log('Loading Stocks into $...');
    $ = cheerio.load(data, {
      normalizeWhitespace: true,
      xmlMode: true
    });
    console.log('Filtering out stock information for stores in Stockholms Län...');
    sthlmStores = $('Butik').filter((i, butik) => {
      return storeNrs.includes($(butik).attr('ButikNr'));
    })
    console.log('Stocks loaded!');
    resolve(sthlmStores);
  });
  // let sTs = findStoresWithGivenProductNrs(['8685501', '141212']); //141212 Norrlands, 8685501 Kraken, 8608901 Tequila
}

export const stuffTodo = async () => {
  let store = await findStore('0102');
  return store;
}

// Updates the database with the latest .xml files from Systembolagets API
export const updateAPIfromSystemet = async () => {
  let storesAndStock = new Promise(async (resolve, reject) => {
    await loadAllStores(),
    await loadAllStocks();
    console.log('Finished loading Stores and Stocks');
    resolve();
  });
  return Promise.all([
    storesAndStock,
    loadAllProducts()
  ])
}

export const findStoresWithGivenProductNrs = (productNrs) => {
  console.log(`findStoresWithGivenProductNrs - searching through ${sthlmStores.length} stores in Stockholm...`);
  const timeBefore = Date.now();

  let matchesToReturn = []; // The return object, the matching stores
  let matchingStores = sthlmStores;
  // console.log('Matching Stores:', matchingStores.length);
  // console.log('Product Numbers:', productNrs);
  return new Promise((resolve, reject) => {
    productNrs.map((productNr) => {
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
    // console.log('Matching Stores after', matchingStores.length);
    const totalTime = Date.now() - timeBefore;
    console.log('Total query time:', totalTime);
    $(matchingStores).map((k, match) => {
      const itsAMatch = $(match).attr('ButikNr');
      // console.log('BUTIKnr:', itsAMatch);
      matchesToReturn.push(itsAMatch);
    })
    resolve(matchesToReturn);
  })
}

export const findStore = (storeNr) => {
  return new Promise((resolve, reject) => {
    Store.findById(storeNr, (err, store) => {
      if(err) reject(err);
      resolve(store);
    })
  })
}