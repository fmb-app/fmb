'use strict';

import express from 'express';
import path from 'path';


const router = express.Router();

router.get('/', (req, res) => {
  let msg = '👋 Yo world.'
  res.json({ message: msg })  
})

module.exports = router;