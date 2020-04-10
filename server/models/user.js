const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const joigoose = require('joigoose')(mongoose);
Joi.objectId = require('joi-objectid')(Joi);

// const Schema = mongoose.Schema;

const joiUserSchema = Joi.object({
  // _id: Joi.objectId().required(),
  personalInfo: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(30).required(),
    picture: Joi.string(),
  },
  employeeInfo: {
    department: Joi.string(),
    position: Joi.string(),
    hourlyWage: Joi.number(),
    roles: Joi.array().items(Joi.objectId()),
    deductions: [
      {
        reason: Joi.string(),
        amount: Joi.number(),
      },
    ],
  },
  workInfo: {
    lastLoginTime: Joi.date(),
    lastLogoutTime: Joi.date(),
    workTime: [
      {
        date: Joi.date(),
        workStartTime: Joi.date(),
        workFinishTime: Joi.date(),
      },
    ],
  },
  isLogin: Joi.boolean(),
  condition: Joi.string(),
  isApproved: Joi.boolean(),
  // note: {
  //   // Personal note
  //   description: Joi.string(),
  //   date: Joi.date(),
  //   isHighPriority: Joi.boolean()
  // }
});

const mongooseUserSchema = joigoose.convert(joiUserSchema);

// const userSchema = new Schema({
//     _id: ObjectId,
//     personalInfo: {
//       email: String,
//       password: String,
//       firstName: String,
//       lastName: String,
//       picture: String
//     },
//     employeeInfo: {
//       department: String,
//       position: String,
//       hourlyWage: Number,
//       roles: Array,
//       workInfo: {
//         lastLoginTime: Date,
//         lastLogoutTime: Date,
//         workTime: [
//           {
//             date: Date,
//             workStartTime: Date,
//             workFinishTime: Date
//           }
//         ]
//       }
//     },
//     isLogin: Boolean,
//     condition: String,
//     note: {                 // Personal note
//       description: String,
//       date: Date,
//       isHighPriority: Boolean
//     }
// });

module.exports = mongoose.model('User', mongooseUserSchema, 'user');
