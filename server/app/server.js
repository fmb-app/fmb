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

app.use('/', routes);

// Hostname and Port
const HOST = '127.0.0.1';
const PORT = process.env.PORT || 8080;

// Start an HTTP server.
app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});