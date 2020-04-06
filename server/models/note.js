const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const joigoose = require('joigoose')(mongoose);
Joi.objectId = require('joi-objectid')(Joi);

const joiNoteSchema = Joi.object({
  userId: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  isHighPriority: Joi.boolean().required()
});

const mongooseNoteSchema = joigoose.convert(joiNoteSchema);

module.exports = mongoose.model('note', mongooseNoteSchema, 'note');
