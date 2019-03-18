'use strict';
import systemet from 'systemet';
import Store from './models/stores';
import Product from './models/products';
import cheerio from 'cheerio';
import fetch from "node-fetch";

const API_URL = 'http://www.systembolaget.se/api';

export let stores = [];
export let products = [];
export let stocks = [];

export const allProducts = () => {
  systemet.products()
    .then(allProducts => {
      products = allProducts;
      console.log(allProducts[0]);
      // products = allProducts.map(product => product.name + '; ' + product.nameExtra);
      console.log('Products loaded');
      allProducts.map(product => {
        const myProduct = new Product({
          productId: product.articleId,
          name1: product.name,
          name2: product.nameExtra,
          category: product.category,
          price: product.price,
          volume: product.volume,
          package: product.packaging,
          alcohol: product.alcohol,
          producer: product.producer
        });
        console.log('Saving product: ', product.articleId);
        myProduct.save();
      });
      console.log('All products saved!');
    });
};

const exampleProduct = { 
  nr: '101',
  articleId: '1',
  itemNumber: '1',
  name: 'Renat',
  nameExtra: null,
  price: 204,
  volume: 700,
  comparePrice: 291.43,
  startDate: '1993-10-01',
  endDate: null,
  category: 'Vodka och Brännvin',
  packaging: 'Flaska',
  seal: null,
  origin: null,
  country: 'Sverige',
  producer: 'Pernod Ricard',
  supplier: 'Pernod Ricard Sweden AB',
  year: null,
  alcohol: 37.5,
  assortment: 'FS',
  ecological: false,
  koscher: false,
  rawMaterials: 'Säd.'
}

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
        // console.log('Stored store: ', myStore);
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