'use strict';
import systemet from 'systemet';
import cheerio from 'cheerio';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var productSchema = new Schema({
  name: { type: String, required: true },
  productId: { type: Number, required: true },
});

export default mongoose.model('Product', productSchema);

