'use strict';

import express from 'express';
import { getStoresWithProducts, getNrOfStores } from '../APICalls/bolaget';
import { googleFetch } from '../APICalls/googleAPIcall';
import { slFetch } from '../APICalls/slAPIcall';
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
    if (err) res.sendStatus(500);
    else res.json(stores);
  });
});

// Return all products of a specific category, e.g. 'Öl'.
router.get('/products/:category', async (req, res) => {
  Product.find({ category: req.params.category}, null, null, (err, products) => {
    if (err) res.sendStatus(500);
    else res.json(products);
  });
});

// Return all products in the database.
router.get('/products', async (req, res) => {
  Product.find({}, null, null, (err, products) => {
    if (err) res.sendStatus(500);
    else res.json(products);
  });
});

// Return all available product categories.
router.get('/categories', (req, res) => {
  Product.distinct('category', (err, categories) => {
    if (err) res.sendStatus(500);
    else res.json(categories);
  });
});

// Get the travel route from given coordinates to given coordinates. Uses Trafiklab API.
router.get('/travel/:olat/:olong/:dlat/:dlong', async (req, res) => {
    const trip = await slFetch(req.params.olat, req.params.olong, req.params.dlat, req.params.dlong);
    const data = await trip;
    res.json(data);
});

/*
{
	"coords": {
		"long": "59.3633306",
"lat": "17.874037"
	},
	"productNrs": ["8685501", "141212", "25602"]
}
*/

// Get the stores that holds all the given productNrs, sorted by distance.
router.post('/stores', async (req, res) => {
  const lat = req.body.coords.lat;
  const long = req.body.coords.long;
  const productNrs = req.body.productNrs;
  // Validate post body
  if (Number(long) === NaN || Number(lat) === NaN || productNrs.some(nr => Number(nr) === NaN)) {
    res.sendStatus(404);
  };
  const storesFromBolaget = await getStoresWithProducts(productNrs);
  let storesLeft = getNrOfStores();
  let nextToken = "";
  let closeStores = [];

  while (storesLeft > 0 && closeStores.length < 3) {
    let googleResults = await googleFetch(lat, long, nextToken);
    let storesFromGoogle = await googleResults;
    storesFromGoogle.results.forEach(store => {
      let matchingBolag = storesFromBolaget.find(bolag => {
        return store.vicinity
          .toLocaleLowerCase('sv')
          .replace(/[^åäöé\w]+/gmi, '')
          .includes(
            bolag.street
              .toLocaleLowerCase('sv')
              .replace(/[^åäöé\w]+/gmi, '')
          );
      });
      // Return combined store objects
      if(matchingBolag !== undefined) {
        const returnStore = {
          nr: matchingBolag._id,
          name: matchingBolag.name,
          street: matchingBolag.street,
          postalCode: matchingBolag.postalCode,
          city: matchingBolag.city,          
          openingHours: matchingBolag.openingHours,
          coords: {
            long: store.geometry.location.lng,
            lat: store.geometry.location.lat,
            rt90x: matchingBolag.rt90x,
            rt90y: matchingBolag.rt90y
          }
        };
        closeStores.push(returnStore);
      }
    });
    nextToken = googleResults.next_page_token;
    console.log('Total stores: ', closeStores.length);
    closeStores.map((store, i) => console.log('Store #',i,':\n', store, '\n-------------------------\n'))
    storesLeft -= 20;
  }


  res.json({stores: closeStores});
})

export default router;
