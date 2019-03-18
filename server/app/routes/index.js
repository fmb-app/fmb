'use strict';

import express from 'express';
import path from 'path';
import { stores, products, stocks } from '../bolaget';

const router = express.Router();

router.get('/stores/:long/:lat', (req, res) => {
  // req.params.long
  res.send('Finds the closest stores to my coordinates.');
});

router.get('/stores', (req, res) => {
  res.json(stores);
});

router.get('/stocks', (req, res) => {
  res.json(stocks);
});

router.get('/products', (req, res) => {
  res.json(products);
});

router.get('/', (req, res) => {
  let msg = '👋 Yo world.';
  res.json({ message: msg });
});

module.exports = router;