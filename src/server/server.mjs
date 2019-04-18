'use strict';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';
import { updateAPIfromSystemet, getStoresWithProducts } from './api/bolaget';
import dotenv from 'dotenv';

dotenv.config(); // Import environment variables

// @TODO: Schedule this to fetch data every 24hrs.
updateAPIfromSystemet();

const app = express();
app.use(express.json()); // Parse json
app.use(express.urlencoded({ extended: true })); // Parse URLs
app.use('/api', routes);
app.use('/', express.static('dist'));

// Set a 404 if the route wasn't found.
app.use((req, res, next) => {
  var err = new Error('Not Found');
  res.status(404);
  next(err);
});

// Middleware that handles errors.
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500);
  let data = {
    message: err.message,
    status: res.statusCode,
  };
  if (app.get('env') === 'development') {
    data.error = err;
  }
  res.send(`<html><body><h1>${res.statusCode}</h1><div>${err.message}</div></body></html>`);
});

app.use((err, req, res, next) => {
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }); // Connect to db

const PORT = process.env.PORT || 8080; // Port

// Start an HTTP server.
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});