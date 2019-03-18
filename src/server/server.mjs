'use strict';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

// Dev tools
import volleyball from 'volleyball'; // logger
import dotenv from 'dotenv';

dotenv.config(); // Import environment variables

// @TODO: Schedule this to fetch data every 24hrs.

const app = express();
app.use(express.json()); // Parse json
app.use(express.urlencoded({ extended: true })); // Parse URLs

app.use(volleyball); // Logging middleware

app.use('/api', routes);
app.use('/', express.static('dist'));

mongoose.connect(process.env.MONGO_CONNECT_STRING, { useNewUrlParser: true }); // Connect to db

const PORT = process.env.PORT || 8080; // Port

// Start an HTTP server.
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});