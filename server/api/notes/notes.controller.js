'use strict';
require('../../models/note');

const mongoose = require('mongoose');
const Notes = mongoose.model('note');

function listAllNotes(req, res) {
  //retrive all feeds from the db
  Notes.find({}, (err, notes) => {
    if (err) return res.status(400).send('Error');

    res.send(notes);
  });
}

function createNote(req, res) {
  const note = new Notes(req.body);

  note.save((err, result) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.status(200).send(result);
  });
}

function deleteNote(req, res) {
  Notes.findOneAndDelete({ _id: req.params.id }, (err, note) => {
    if (err) return res.status(400).send('Error');
    if (!note) return res.status(404).send();

    res.status(200).send();
  });
}

// Any functions we create, we want to return these functions to the express app to use.
module.exports = { listAllNotes, createNote, deleteNote };
