'use strict';
import systemet from 'systemet';
import Store from './models/stores';
import Product from './models/products';
import cheerio from 'cheerio';

const API_URL = 'http://www.systembolaget.se/api';

export let stores = [];
export let products = [];
export let stocks = [];

export const allProducts = () => {
  systemet.products()
    .then(allProducts => {
      products = allProducts.map(product => product.name + '; ' + product.nameExtra);
      console.log('Products loaded');
    });
};

export const allStocks = () => {
  fetch('http://www.systembolaget.se/api/assortment/stock/xml')
    .then(res => {
      const $ = cheerio.load(res.body, {
        normalizeWhitespace: true,
        xmlMode: true
      });
      console.log($);
      // return $('artikel').map((i, el) => toProduct($, el)).get();
    });
};

export const allStores = () => {
  systemet.stores()
    .then(allStores => {
      stores = allStores.filter(store => store.type === 'Butik' && store.county === 'Stockholms län');
      console.log('Stores loaded');
      stores.map(store => {
        const myStore = new Store({
          storeId: store.nr,
          name: store.name,
          street: store.address,
          postalCode: store.zipCode,
          city: store.city,
          rt90x: store.rt90.x,
          rt90y: store.rt90.y,
          products: []
        });
        console.log('Stored store: ', myStore);
        myStore.save();
      });
    });
};

console.log('Stores loading...');
allStores();
console.log('Products loading...');
allProducts();
// console.log('Stocks loading...');
// allStocks();