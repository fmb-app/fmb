'use strict';

import systemet from 'systemet';

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