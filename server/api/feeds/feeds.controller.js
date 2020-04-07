'use strict';
require('../../models/feed');

const mongoose = require('mongoose');
const Feeds = mongoose.model('feed');

function listAllFeeds(req, res) {
  //retrive all feeds from the db
  Feeds.find({}, (err, feeds) => {
    if (err) return res.status(400).send('Error');

    res.send(feeds);
  });
}

function createFeed(req, res) {
  const feed = new Feeds(req.body);

  feed.save((err, result) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.status(200).send(result);
  });
}

function updateFeed(req, res) {
  Feeds.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    (err, feed) => {
      if (err) return res.status(400).send('Error');
      if (!feed) return res.status(404).send();

      res.status(200).send();
    }
  );
}

function deleteFeed(req, res) {
  Feeds.findOneAndDelete({ _id: req.params.id }, (err, feed) => {
    if (err) return res.status(400).send('Error');
    if (!feed) return res.status(404).send();

    res.status(200).send();
  });
}

// Any functions we create, we want to return these functions to the express app to use.
module.exports = { listAllFeeds, createFeed, updateFeed, deleteFeed };
