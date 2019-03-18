'use strict';
import systemet from 'systemet';
import cheerio from 'cheerio';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var productSchema = new Schema({
  productId: { type: Number, required: true },
  name1: { type: String, required: true },
  name2: String,
  group: String,
  price: Number,
  volume: Number,
  package: String,
  alcohol: Number,
  producer: String
});

export default mongoose.model('Product', productSchema);

