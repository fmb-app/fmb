'use strict';
import systemet from 'systemet';
import Store from '../models/stores';
import Product from '../models/products';
import { googleFetch } from '../api/google';
import cheerio from 'cheerio';
import fetch from "node-fetch";

let storeNrs = [];
let sthlmStores = [];
let $ = null;

// Fetches all products from Systembolagets API and saves to our database.
const saveProductsToDB = () => {
  return new Promise(async (resolve, reject) => {
    console.log('saveProductsToDB():\tSaving products to database...');
    const products = await systemet.products();
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
      Product.findOneAndUpdate({_id: myProduct._id}, myProduct, {upsert: true},  err => {if (err) reject(err)});
    });
    console.log('saveProductsToDB():\tProducts saved to DB!');
    resolve();
  });
}

// Fetches all stores in Stockholms Län from Systembolagets API and saves to our database.
const saveStoresToDB = () => {
  return new Promise(async (resolve, reject) => {
    storeNrs = [];
    const stores = await systemet.stores();
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
        Store.findOneAndUpdate({_id: myStore._id}, myStore, {upsert: true},  err => {if (err) reject(err)});
        storeNrs.push(store.nr);
      }
    });
    console.log('saveStoresToDB():\tStores saved to DB!');
    resolve(storeNrs);
  });
}

// Loads the stock xml file from Systembolagets API into the cheerio $ object
const loadAllStocks = () => {
  return new Promise(async resolve => {
    console.log('loadAllStocks():\tStocks loading...fetching from Systembolaget\'s API');
    const res = await fetch('http://www.systembolaget.se/api/assortment/stock/xml');
    const data = await res.text();
    $ = cheerio.load(data, { normalizeWhitespace: true, xmlMode: true });
    sthlmStores = $('Butik').filter((i, butik) => storeNrs.includes($(butik).attr('ButikNr')));
    console.log('loadAllStocks():\tStocks loaded!');
    resolve(sthlmStores);
  });
}

// Updates the database with the latest .xml files from Systembolagets API
export const updateAPIfromSystemet = async () => {
  console.log('updateAPIfromSystemet()\tUpdating database with the latest Systembolaget data...');
  let storesAndStock = new Promise(async resolve => {
    await saveStoresToDB();
    await loadAllStocks();
    console.log('updateAPIfromSystemet():\tFinished loading Stores and Stocks');
    resolve();
  });
  let allLoads = await Promise.all([
    storesAndStock,
    //saveProductsToDB()
  ]);
  console.log('updateAPIfromSystemet()\tDatabase updated with fresh Systembolaget API data!\n\n\n');
  return allLoads;
}

// Find the store ids of stores that carry all the products with the given productNrs.
const findStoresWithGivenProductNrs = productNrs => {
  console.log(`findStoresWithGivenProductNrs():\tfindStoresWithGivenProductNrs - searching through ${sthlmStores.length} stores in Stockholm...`);
  return new Promise(resolve => {
    let matchesToReturn = []; // The return object, the matching stores
    let matchingStores = sthlmStores;
    console.log('findStoresWithGivenProductNrs():\tStores in Stockholms Län:', matchingStores.length);
    console.log('findStoresWithGivenProductNrs():\tSearching for products with ids:', productNrs);
    productNrs.map(productNr => {
      matchingStores = $(matchingStores).filter((i, store) => {
        let result = false;
        $(store).children().each((j, artikel) => {
          if ($(artikel).text() == productNr) {
            result = true;
            return false;
          }
        })
        return result;
      });
    })
    $(matchingStores).map((k, match) => { matchesToReturn.push($(match).attr('ButikNr')) });
    console.log(`findStoresWithGivenProductNrs():\tFound (${matchesToReturn.length}) matching stores.`);
    resolve(matchesToReturn);
  })
}

// Finds all stores that have all the given products in stock.
export const getStoresWithProducts = async productNrs => {
  const timeBefore = Date.now();
  let storeNrsWithGivenProducts = await findStoresWithGivenProductNrs(productNrs); //141212 Norrlands, 8685501 Kraken, 8608901 Tequila
  let finalStores = [];
  await Promise.all(storeNrsWithGivenProducts.map(async storeNr => {
    const store = await findStore(storeNr);
    return finalStores.push(store);
  }));
  const totalTime = Date.now() - timeBefore;
  console.log('getStoresWithProducts():\tTotal query time:', totalTime);
  return finalStores;
}

export const getNrOfStores = () => {
  return sthlmStores.length;
};

// Find a specific store in the database.
export const findStore = storeNr => {
  return new Promise((resolve, reject) => {
    Store.findById(storeNr, (err, store) => {
      if(err) reject(err);
      resolve(store);
    })
  })
}

// Check whether the store and the bolag refers to the same Systembolag.
const bolagMatchesStore = (store, bolag) => {
  return store.vicinity
    .toLocaleLowerCase('sv')
    .replace(/[^åäöé\w]+/gmi, '')
    .includes(
      bolag.street
        .toLocaleLowerCase('sv')
        .replace(/[^åäöé\w]+/gmi, '')
    )
}

// Combines a Systembolaget store and a GoogleAPI store into a single object
const combineStoreObjects = (matchingBolag, store) => {
  return {
    nr: matchingBolag._id,
    name: matchingBolag.name,
    street: matchingBolag.street,
    postalCode: matchingBolag.postalCode,
    city: matchingBolag.city,
    openingHours: matchingBolag.openingHours,
    location: {
      coords: {
        lat: store.geometry.location.lat,
        long: store.geometry.location.lng,
      },
      rt90: {
        x: matchingBolag.rt90x,
        y: matchingBolag.rt90y
      }
    }
  }
}

// Get the stores that holds all the given productNrs, sorted by distance.
export const findStoresWithProduct = async (lat, long, productNrs) => {
  // Validate post body
  if (Number(long) === NaN || Number(lat) === NaN || productNrs.some(nr => Number(nr) === NaN)) {
    return -1;
  };
  // Increment these products' hitCounts by 1:
  productNrs.forEach(productNr => {
    Product.findOneAndUpdate({nr: productNr}, { $inc: {hitCount: 1} },  err => {if (err) console.log('Could not update hitcount of product:', productNr, err)})
  })

  const storesFromBolaget = await getStoresWithProducts(productNrs);
  let storesLeft = getNrOfStores();
  let nextToken = "";
  let closeStores = [];

  while (storesLeft > 0 && closeStores.length < 3) {
    const googleResults = await googleFetch(lat, long, nextToken);
    const storesFromGoogle = await googleResults;
    storesFromGoogle.results.forEach(store => {
      const matchingBolag = storesFromBolaget.find(bolag => bolagMatchesStore(store, bolag));
      // Return combined store objects
      if(matchingBolag !== undefined) {
        if(!closeStores.some(closeStore => closeStore.nr === matchingBolag._id)) {
          closeStores.push(combineStoreObjects(matchingBolag, store));
        }
      };
    });
    nextToken = googleResults.next_page_token;
    storesLeft -= 20;
    // console.log('Total stores: ', closeStores.length);
    // closeStores.map((store, i) => console.log('Store #',i,':\n', store.street, '\n-------------------------\n'))
  }
  return closeStores;
}
