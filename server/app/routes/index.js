'use strict';

const express = require('express')
const path = require('path')

const router = express.Router()


router.get('/', (req, res) => {
    let msg = '👋 Yo world.'
    res.json({ message: msg })  
})

module.exports = router