'use strict';
require('../../models/schedule');

const mongoose = require('mongoose');
const Schedules = mongoose.model('schedule');


function listAllSchedules(req, res) {
  //retrive all feeds from the db
  Schedules.find({}, (err, schedules) => {
    if (err) return res.status(400).send('Error');

    res.send(schedules);
  });
}

function createSchedule(req, res) {
  const schedule = new Schedules(req.body);

  schedule.save((err, result) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.status(200).send(result);
  });
}

function updateSchedule(req, res) {
  const schedule = req.body;

  Schedules.findOneAndUpdate(
    { '_id': schedule._id },
    schedule,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
}

function deleteSchedule(req, res) {
  Schedules.findOneAndDelete({ _id: req.params.id }, (err, schedule) => {
    if (err) return res.status(400).send('Error');
    if (!schedule) return res.status(404).send();

    res.status(200).send();
  });
}

// Any functions we create, we want to return these functions to the express app to use.
module.exports = { listAllSchedules, createSchedule, deleteSchedule, updateSchedule };
