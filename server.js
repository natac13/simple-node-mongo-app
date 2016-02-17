'use strict';

const express = require('express');
const path = require('path');
const indexRouter = require('./app/routes/index');
const clicksRouter = require('./app/routes/api');

const Promise = require("bluebird");
const mongoose = require("mongoose");

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


const mongoUrl = 'mongodb://localhost:27017/simple';
mongoose.connect(mongoUrl)

app.use(express.static(path.join(__dirname, './app/assets')));
app.use('/', indexRouter);
app.use('/api', clicksRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);

});

