'use strict';
import systemet from 'systemet';
import cheerio from 'cheerio';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var storeSchema = new Schema({
  storeId: { type: Number, required: true },
  name: { type: String, required: true },
  street: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  rt90x: { type: Number, required: true },
  rt90y: { type: Number, required: true },
  products: [productSchema]
});

export default mongoose.model('Store', storeSchema);





