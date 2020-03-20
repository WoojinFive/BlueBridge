const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const joigoose = require('joigoose')(mongoose);
Joi.objectId = require('joi-objectid')(Joi);

const joiScheduleSchema = Joi.object({
      // _id: Joi.objectId(),
      type: Joi.string().required(),
      user: Joi.array().items(Joi.objectId()),
      startDate: Joi.date(),
      endDate: Joi.date(),
      isApproved: Joi.boolean(),
      title: Joi.string(),
      description: Joi.string(),
}, {versionKey: false})

const mongooseScheduleSchema = joigoose.convert(joiScheduleSchema);

// const scheduleSchema = new Schema({
//     Meeting: [
//         {
//           purpose: String,
//           participants: Array,
//           location: String,
//           date: Date
//         },
//       ],
//       Vacation: [
//         {
//           user: ObjectId,
//           description: String,
//           startDate: Date,
//           endDate: Date,
//           isApproved: Boolean
//         }
//       ],
//       Event: [
//         {
//           title: String,
//           description: String,
//           date: Date
//         }
//       ]
    
// });
  
module.exports = mongoose.model('schedule', mongooseScheduleSchema, 'schedule');