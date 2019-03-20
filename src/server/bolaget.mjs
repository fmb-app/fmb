'use strict';
import systemet from 'systemet';
import Store from './models/stores';
import Product from './models/products';
import cheerio from 'cheerio';
import fetch from "node-fetch";

export let stores = [];
export let products = [];
export let stocks = [];

export const allProducts = () => {
  console.log('Products loading...');
  systemet.products()
    .then(allProducts => {
      products = allProducts;
      allProducts.map(product => {
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
      console.log('Products loaded');
      // console.log('All products saved!');
      // let pro = Product.find({nr: 1234301}, (err, pros) => {
      //   console.log(pros);
      // });
    });
};

export const allStocks = () => {
  console.log('Stocks loading...');
  fetch('http://www.systembolaget.se/api/assortment/stock/xml')
  .then(res => res.text())
  .then(data => {
    const $ = cheerio.load(data, {
      normalizeWhitespace: true,
      xmlMode: true
    });
    const butiker = $('Butik');
    butiker.each((i, el) => {
      let artiklar = [];
      const butikNr = el.attribs.ButikNr;
      butiker[i].children.map((artikel) => {
        const artikelNr = (artikel.children[0].data)
        artiklar.push(artikelNr)
      });
      console.log('BUUUUUTIIIIIIIIIIIIIIIIIK: ', butikNr);
      console.log(artiklar);
    }
    );
    console.log('Stocks loaded');
    });
};

export const allStores = () => {
  console.log('Stores loading...');
  systemet.stores()
    .then(allStores => {
      stores = allStores.filter(store => store.type === 'Butik' && store.county === 'Stockholms län');
      stores.map(store => {
        const myStore = new Store({
          _id: Number(store.nr),
          name: store.name,
          street: store.address,
          postalCode: store.zipCode,
          city: store.city,
          rt90x: store.rt90.x,
          rt90y: store.rt90.y,
          openingHours: store.openingHours,
          products: []
        });        
        Store.replaceOne({_id: myStore._id}, myStore, {upsert: true},  (err, raw) => {
          if (err) console.log(err);
        })
      });
      console.log('Stores loaded');
    });
}

export const updateModel = () => {
  // allStores();
  // allProducts();
  // allStocks();
}

updateModel();