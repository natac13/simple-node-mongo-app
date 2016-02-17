'use strict';

const clickHandler = (db) => {
  const clicks = db.collection('click');

  const getClicks = (req, res) => {
    // a projection of how I want the resulting data to come back(look like)
    // this is simply saying to not include the _id property from the result
    const clickProjection = { '_id': false };

    // first argument is the query, which is just all in this case
    // second is the clickProjection from above
    // third an error first callback
    clicks.findOneAsync({}, clickProjection)
    .then(function findSuccess(result) {
      if (!!result) {
        res.json(result);
      } else {
        clicks.insertAsync({ 'clicks': 0 })
          .then(clicks.findOneAsync({}, clickProjection)
            .then((doc) => {
            res.json(doc);
          }))

      }
    })
    .catch((error) => {
      console.log(error);
    })

  }

  const addClick = (req, res) => {
    clicks.findAndModifyAsync({}, { '_id': 1 }, { $inc: { 'clicks': 1 }})
      .then(
        result => res.json(result),
        error => console.log(error)
      );
  }

  const resetClicks = (req, res) => {
    clicks.updateAsync({}, { 'clicks': 0 })
      .then(
        result => res.json(result),
        error => console.log(error)
      )
  }

  return {
    getClicks,
    addClick,
    resetClicks
  }
}

module.exports = clickHandler;