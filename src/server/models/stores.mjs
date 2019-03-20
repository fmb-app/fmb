'use strict';
import systemet from 'systemet';
import cheerio from 'cheerio';
import mongoose from 'mongoose';
import { productSchema } from './products';

const Schema = mongoose.Schema;

var storeSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String },
  street: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  rt90x: { type: Number, required: true },
  rt90y: { type: Number, required: true },
  openingHours: { type: Object },
  products: [ productSchema ]
});

export default mongoose.model('Store', storeSchema);





