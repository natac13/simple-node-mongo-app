'use strict';

const express = require('express');
const path = require('path');
const indexRouter = require('./app/routes/index');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const app = express();
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3300 ;


const mongoUrl = 'mongodb://localhost:27017/simple';
MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    console.log('Connection failed');
    throw err;
  } else {
    console.log('Mongo Connection good on port 27017');
  }

  app.use(express.static(path.join(__dirname, './app/assets')));
  app.use('/', indexRouter);

  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);

  });
});