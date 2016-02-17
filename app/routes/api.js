const express = require('express');
const router = express.Router();
const path = require('path');

const ClickHandler = require('../controllers/clickHandler.server');
const clickHandler = ClickHandler();

router.route('/clicks')
  .get(clickHandler.getClicks)
  .post(clickHandler.addClick)
  .delete(clickHandler.resetClicks);

module.exports = router;