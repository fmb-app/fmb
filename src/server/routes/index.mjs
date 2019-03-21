'use strict';

import express from 'express';
import { findStoresWithGivenProductNrs } from '../APICalls/bolaget';
import { googleFetch } from '../APICalls/googleAPIcall'

const router = express.Router();


// Get the 20 closest Systembolaget stores from the given coordinates. Uses Google Places API.
router.get('/stores/:long/:lat', (req, res) => {
  googleFetch(req.params.long, req.params.lat)
    .then((data) => {
      res.json(data);
    });
});

// router.get('/stores', (req, res) => {
//   res.json(stores);
// });

// router.get('/stocks', (req, res) => {
//   res.json(stocks);
// });

// router.get('/products', (req, res) => {
//   res.json(products);
// });

// router.get('/googleAPI', (req, res) => {
//   googleFetch(59.3633306,17.871843).then((data) => {
//     res.json(data);
//   });
// })

router.get('/', (req, res) => {
  let msg = '👋 Yo world.';
  res.json({ message: msg });
});

export default router;
