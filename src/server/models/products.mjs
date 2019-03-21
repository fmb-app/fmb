'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const productSchema = new Schema({
  _id: { type: Number, required: true },
  nr: { type: Number, required: true },
  name1: { type: String, required: true },
  name2: { type: String },
  category: { type: String },
  price: { type: Number },
  volume: { type: Number },
  package: { type: String },
  alcohol: { type: Number },
  producer: { type: String }
});

export default mongoose.model('Product', productSchema);

