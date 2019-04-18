'use strict';

import express from 'express';
import { findStoresWithProduct } from '../api/bolaget';
import { googleFetch } from '../api/google';
import { slFetch } from '../api/sl';
import Product from '../models/products';
import Store from '../models/stores';

const router = express.Router();

// Get the 20 closest Systembolaget stores from the given coordinates. Uses Google Places API.
router.get('/stores/:lat/:long', async (req, res) => {
  if (Number(req.params.long) !== NaN && Number(req.params.lat) !== NaN) {
    const stores = await googleFetch(req.params.lat, req.params.long);
    const data = await stores;
    res.json(data);
  } else res.sendStatus(400);
});

// Return all stores in Stockholms Län
router.get('/stores', (req, res) => {
  Store.find({}, null, null, (err, stores) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else res.json(stores);
  });
});

// Return all products of a specific category, e.g. 'Öl'.
router.get('/products/:category', async (req, res) => {
  Product.find({ category: req.params.category }, null, null, (err, products) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else res.json(products);
  });
});

// Return all products in the database.
router.get('/products', async (req, res) => {
  Product.find({}, null, null, (err, products) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else res.json(products);
  });
});

// Return all products in the database that matches the query and category.
router.get('/products/:category/:query/:offset/:sorting', async (req, res) => {
  const category = req.params.category === 'null' ? '' : req.params.category;
  const query = req.params.query === 'null' ? '' : req.params.query;
  const offset = Number(req.params.offset) || 0;
  let sorting = {};
  switch (req.params.sorting) {
    case 'POPULARITY_ASC':
      sorting = {hitCount: 1, name1: 1}
      break;
      case 'POPULARITY_DESC':
      sorting = {hitCount: -1, name1: 1}
      break;
    case 'ALPHABETICAL_DESC':
      sorting = {name1: -1}
      break;
    default:
      sorting = {name1: 1}
      break;
  }

  const toRegEx = (param) => new RegExp(param, 'i')
  Product
    .find({ category: toRegEx(category), $or: [{name1: toRegEx(query)}, {name2: toRegEx(query)}]})
    .sort(sorting)
    .skip(offset)
    .limit(20)
    .collation({locale: 'sv' })
    .exec((err, products) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else res.json(products);
    }
  );
});

// Return all available product categories.
router.get('/categories', (req, res) => {
  Product.distinct('category', (err, categories) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else res.json(categories);
  });
});

// Get the travel route from given coordinates to given coordinates. Uses Trafiklab API.
router.get('/travel/:olat/:olong/:dlat/:dlong', async (req, res) => {
    const trip = await slFetch(req.params.olat, req.params.olong, req.params.dlat, req.params.dlong);
    res.json(trip);
});

// Get the stores that holds all the given productNrs, sorted by distance.
router.post('/stores', async (req, res) => {
  const lat = req.body.coords.lat;
  const long = req.body.coords.long;
  const productNrs = req.body.productNrs;
  
  const closeStores = await findStoresWithProduct(lat, long, productNrs);
  closeStores === -1 
    ? res.sendStatus(404) // There was an error fetching the stores.
    : res.json({stores: closeStores}); // Return the stores.
})

export default router;
