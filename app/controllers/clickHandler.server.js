'use strict';

const Clicks = require('../models/clicks');

const clickHandler = () => {

  const getClicks = (req, res) => {
    // a projection of how I want the resulting data to come back(look like)
    // this is simply saying to not include the _id property from the result
    const clickProjection = { '_id': false };

    Clicks.findOne({}, clickProjection)
      .exec((err, result) => {
        if (!!err) { throw err; }
        if (!!result) {
          res.json(result);
        } else {
          const newDoc = new Clicks({ 'clicks': 0 });
          newDoc.save((err, doc) => {
            if (err) { throw err; }
            res.json(doc)
          })
        }
      })

  }

  const addClick = (req, res) => {
    Clicks.findOneAndUpdate({}, { $inc: { 'clicks': 1 }})
      .exec((err, result) => {
        if (err) { throw err; }
        res.json(result)
      });
  }

  const resetClicks = (req, res) => {
    Clicks.findOneAndUpdate({}, { 'clicks': 0 })
      .exec((err, result) => {
        if (err) { throw err; }
        res.json(result)
      });
  }

  return {
    getClicks,
    addClick,
    resetClicks
  }
}

module.exports = clickHandler;