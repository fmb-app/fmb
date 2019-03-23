'use strict';

import express from 'express';
import { getStoresWithProducts, getNrOfStores } from '../APICalls/bolaget';
import { googleFetch } from '../APICalls/googleAPIcall'

const router = express.Router();

// Get the 20 closest Systembolaget stores from the given coordinates. Uses Google Places API.
router.get('/stores/:long/:lat', async (req, res) => {
  if (Number(req.params.long) !== NaN && Number(req.params.lat) !== NaN) {
    let stores = await googleFetch(req.params.long, req.params.lat);
    let data = await stores;
    res.json(data);
  }
  res.sendStatus(400);
});

// router.get('/products', (req, res) => {
//   res.json(products);
// });

/*
{
	"coords": {
		"long": "59.3633306",
		"lat": "17.874037"
	},
	"productNrs": ["8685501", "141212"]
}
*/

// Get the stores that holds all the given productNrs, sorted by distance.
router.post('/stores', async (req, res) => {
  const long = req.body.coords.long;
  const lat = req.body.coords.lat;
  const productNrs = req.body.productNrs;
  // Validate post body
  if (Number(long) === NaN || Number(lat) === NaN || productNrs.some(nr => Number(nr) === NaN)) {
    res.sendStatus(404);
  };
  const storesFromBolaget = await getStoresWithProducts(productNrs);
  let storesLeft = getNrOfStores();
  let offset = 0;
  let closeStores = [];

  while (storesLeft > 0 && closeStores.length < 3) {

    let googleResults = await googleFetch(long, lat, offset);  
    let storesFromGoogle = await googleResults;
    let closestStoresWithProducts = storesFromGoogle.results.filter(store => {
      return storesFromBolaget.some(bolag => {
        return store.vicinity
          .toLocaleLowerCase('sv')
          .replace(/[^åäöé\w]+/gmi, '')
          .includes(
            bolag.street
              .toLocaleLowerCase('sv')
              .replace(/[^åäöé\w]+/gmi, '')
          );
      })
    });
    closeStores = [...closeStores, ...closestStoresWithProducts];
    console.log('Total stores: ', closeStores.length);
    closeStores.map(store => console.log(store.vicinity))
    storesLeft -= 20;
    offset += 20;
  }


  res.json({stores: closeStores});
})

router.get('/', (req, res) => {
  let msg = '👋 Yo world.';
  res.json({ message: msg });
});

export default router;
