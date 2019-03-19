'use strict';
import cheerio from 'cheerio';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const productSchema = new Schema({
  _id: { type: Number, required: true },
  nr: { type: Number, required: true },
  name1: { type: String, required: true },
  name2: String,
  category: String,
  price: Number,
  volume: Number,
  package: String,
  alcohol: Number,
  producer: String
});

export default mongoose.model('Product', productSchema);

