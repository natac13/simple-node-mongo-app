'use strict';

const express = require('express');
const path = require('path');
const indexRouter = require('./app/routes/index');

const Promise = require("bluebird");
const MongoDB = Promise.promisifyAll(require("mongodb"));
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

const app = express();

/*===============================
=            Webpack            =
===============================*/
/*** Webpack imports ***/
const webpack = require('webpack');
const config  = require('./webpack.config.js');

const webpackMiddleware    = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(config);
const webpackOptions = {
    publicPath: config.output.publicPath,
    quiet: false,
    // hides all the bundling file names
    noInfo: true,
    // adds color to the terminal
    stats: {
        colors: true
    }
};

app.use(webpackMiddleware(compiler, webpackOptions));
app.use(webpackHotMiddleware(compiler));


/*=====  End of Webpack  ======*/


const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3300 ;

const ClickHandler = require('./app/controllers/clickHandler.server');

const mongoUrl = 'mongodb://localhost:27017/simple';
MongoClient.connectAsync(mongoUrl)
  .then((db) => {
    const clickHandler = ClickHandler(db);
    app.use(express.static(path.join(__dirname, './app/assets')));
    app.use('/', indexRouter);

    app.route('/api/clicks')
      .get(clickHandler.getClicks)
      .post(clickHandler.addClick)
      .delete(clickHandler.resetClicks);

    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);

    });
  })
  .catch((error) => {
    console.log('There was an error');
    console.log(error);
  });
