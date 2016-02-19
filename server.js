'use strict';

const express = require('express');
const path = require('path');
const indexRouter = require('./app/routes/index');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const session = require('express-session');

const Promise = require("bluebird");
const mongoose = require("mongoose");
mongoose.Promise = Promise;

const app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

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
app.use(express.static(path.join(__dirname, './app/assets')));
app.use(cookieParser());
app.use(bodyParser());
/*======================================
=            Passport Setup            =
======================================*/

app.use(session({
  secret: 'superSecret',
  resave: false, // resave even when no modifications
  saveUninitialized: true // force a new session to be created and stored
}));

app.use(passport.initialize());
app.use(passport.session());

/*=====  End of Passport Setup  ======*/

app.use('/', indexRouter);


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);

});

