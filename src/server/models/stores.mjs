'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var storeSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String },
  street: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  rt90x: { type: Number, required: true },
  rt90y: { type: Number, required: true },
  openingHours: { type: Object }
});

export default mongoose.model('Store', storeSchema);





