'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  github: {
    id: String,
    displayName: String,
    username: String,
    publicRepos: Number
  },
  numClicks: {
    clicks: Number
  }
});

module.exports = User;