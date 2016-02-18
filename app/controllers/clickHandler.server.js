'use strict';

const Users = require('../models/users');

const clickHandler = () => {
  const clickProjection = { '_id': false };

  const getClicks = (req, res) => {
    Users.findOne({ 'github.id': req.user.github.id }, clickProjection)
      .exec()
        .then(function successExec(result) {
          res.json(result.numClicks);
        })
        .catch(err => console.log(err));

  }

  const addClick = (req, res) => {
    Users.findOneAndUpdate(
      { 'github.id': req.user.github.id },
      { $inc: { 'numClicks.clicks': 1 }}
    )
      .exec()
        .then(result => res.json(result.numClicks))
        .catch(err => console.log(err));
  }

  const resetClicks = (req, res) => {
    Users.findOneAndUpdate(
      { 'github.id': req.user.github.id },
      { 'numClicks.clicks': 0 }
    )
      .exec()
        .then(result => res.json(result.numClicks))
        .catch(err => console.log(err));
  }

  return {
    getClicks,
    addClick,
    resetClicks
  }
}

module.exports = clickHandler;