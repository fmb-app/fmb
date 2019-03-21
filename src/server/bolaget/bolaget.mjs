'use strict';
import systemet from 'systemet';
import Store from '../models/stores';
import Product from '../models/products';
import cheerio from 'cheerio';
import fetch from "node-fetch";

// export let storeNrs = [];
let $ = null;
// export let products = [];
// export let stocks = [];
// export let products = {};

// Saves all products to the database.
const saveProductsToDB = (products) => {
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
      if (err) console.log(err);
    });
  });
}

// Saves all stores in Stockholms Län to the database
const saveStoresToDB = (stores) => {
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
        if (err) console.log(err);
      })
      // storeNrs.push(store.nr);
    }
  });
}

// Fetches all products from Systembolagets API and saves to our database.
export const loadAllProducts = async () => {
  console.log('Products loading...');
  const products = await systemet.products()
  console.log('Products loaded!');
  saveProductsToDB(products);
}

// Fetches all stores from Systembolagets API and saves to our database.
export const loadAllStores = async () => {
  console.log('Stores loading...');
  const stores = await systemet.stores()
  console.log('Stores loaded!');
  saveStoresToDB(stores);
}

// Loads the stock xml file from Systembolagets API into the cheerio $ object
export const loadAllStocks = async () => {
  console.log('Stocks loading...');
  const res = await fetch('http://www.systembolaget.se/api/assortment/stock/xml');
  const data = await res.text();

  $ = cheerio.load(data, {
    normalizeWhitespace: true,
    xmlMode: true
  });
  console.log('Stocks loaded!');
}

// Updates the database with the latest .xml files from Systembolagets API
export const updateAPIfromSystemet = () => {
  loadAllStores();
  loadAllProducts();
  loadAllStocks();
}
















const saveStockToDB = (storesNrs) => {
  // const butiker = $('Butik');
  $('Butik').each((i, butik) => {
    let artiklar = [];
    const butikNr = $(butik).attr('ButikNr');
    // const butikNr = butik.attribs.ButikNr;

    // Only keep stock info about stores in Stockholms Län   
    if (storeNrs.includes(butikNr)) {
      $(butik).children().map((i, artikel) => {
        const artikelNr = ($(artikel).text());
        artiklar.push(artikelNr);
      //   $(artikel, el).children()
      //   const artikelNr = (artikel.children[0].data)
      });
      // console.log(artiklar);
    }
  });
}