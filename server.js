'use strict';

const express = require('express');
const indexRouter = require('./app/routes/index');

const app = express();
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3300 ;
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})