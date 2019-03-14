'use strict';

// Imports
const express = require('express');

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

// Hostname and Port
const HOST = '127.0.0.1';
const PORT = process.env.PORT || 8080;

// Start an HTTP server.
app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});