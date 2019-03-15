'use strict';

// Imports
const express = require('express');
const path = require('path');

const bolaget = require('./bolaget');

// Dev tools
require('dotenv').config(); // Import environment variables
const volleyball = require('volleyball'); // logger

const app = express();
app.use(express.json()); // Parse json
app.use(express.urlencoded({ extended: true })); // Parse URLs

app.use(volleyball); // Logging middleware

const routes = require('./routes/index');
app.use('/api', routes);

app.use('/', express.static(path.join(__dirname, '../../client/build')))

const PORT = process.env.PORT || 8080; // Port

const products = bolaget.products()
  .then(allProducts => {
    allProducts.map(product => {console.log(product.name)})
  });


// Start an HTTP server.
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});

