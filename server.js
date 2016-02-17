'use strict';

const express = require('express');
const path = require('path');
const indexRouter = require('./app/routes/index');

const Promise = require("bluebird");
const MongoDB = Promise.promisifyAll(require("mongodb"));
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);


const app = express();
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3300 ;

const ClickHandler = require('./app/controllers/clickHandler.server');

const mongoUrl = 'mongodb://localhost:27017/simple';
MongoClient.connectAsync(mongoUrl)
  .then((db) => {
    const clickHandler = ClickHandler(db);
    app.use(express.static(path.join(__dirname, './app/assets')));
    app.use('/', indexRouter);

    app.get('/api/clicks', clickHandler.getClicks);

    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);

    });
  })
  .catch((error) => {
    console.log('There was an error');
    console.log(error);
  });
