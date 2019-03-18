'use strict';
import systemet from 'systemet';
import cheerio from 'cheerio';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var storeSchema = new Schema({
  name: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  address: { type: String, required: true }
});

export default mongoose.model('Store', storeSchema);

