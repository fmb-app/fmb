'use strict';
import systemet from 'systemet';
import Store from './models/stores';
import Product from './models/products';

export const products = () => {
  console.log('Getting All Products:');
  return systemet.products();
};

export const stores = () => {
  systemet.stores()
    .then(allStores => {
      return allStores;
    });
};

const myStore = new Store({
  name: 'Jarlaplan',
  longitude: 123,
  latitude: 456,
  address: 'Birger Jarlsgatan 142'
});

console.log(myStore.name);



