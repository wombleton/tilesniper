'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');

const TileSchema = new Schema({
  createdAt: {
    default: Date.now,
    type: Date
  },
  fileName: String,
  image: String,
  label: String,
  hash: {
    index: true,
    type: String
  },
  size: Number,
  x: Number,
  y: Number,
  updatedAt: Date
});

TileSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  this.hash = md5(this.image);

  next();
});

module.exports = mongoose.model('Tile', TileSchema);
