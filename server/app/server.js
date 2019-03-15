'use strict';
import express from 'express';
import path from 'path';
import { products, stores } from './bolaget';
import routes from './routes/index';

// Dev tools
import volleyball from 'volleyball'; // logger
require('dotenv').config(); // Import environment variables


const app = express();
app.use(express.json()); // Parse json
app.use(express.urlencoded({ extended: true })); // Parse URLs

app.use(volleyball); // Logging middleware

app.use('/api', routes);

app.use('/', express.static(path.join(__dirname, '../../client/build')))

const PORT = process.env.PORT || 8080; // Port

products()
  .then(allProducts => {
    allProducts.map(product => {console.log(product.name)})
  });

// Start an HTTP server.
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});

