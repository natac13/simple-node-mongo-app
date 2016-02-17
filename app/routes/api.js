const express = require('express');
const router = express.Router();
const path = require('path');

const ClickHandler = require('../controllers.server');
const clickHandler = ClickHandler();

router.route('/clicks')
  .get(clickHandler.getClicks);


module.exports = router;