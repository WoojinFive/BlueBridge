'use strict';

require('../../models/user');

const mongoose = require('mongoose');
const Users = mongoose.model('User');

const jwt = require('jsonwebtoken');

const util = require('../../utility/utility');

function listAllUsers(req, res) {
  Users.find({}, (err, users) => {
    if (err) return res.status(400).send('Error');
    res.send(users);
  });
  // return res.json(users);
}

function findUserByEmail(req, res, next) {
  const email = req.params.email;
  const result = users.filter(user => user.email === email);
  return res.json(result);
}

function create(req, res) {
  const user = req.body;
  users.push(user);
  return res.json(users);
}

function update(req, res) {
  const user = req.body;

  // Users.findOne(
  //   { 'personalInfo.email': user.personalInfo.email },
  //   (err, doc) => {
  //     util.updateDocument(doc, Users, user);
  //     doc.save();
  //   }
  // );

  Users.findOneAndUpdate(
    { 'personalInfo.email': user.personalInfo.email },
    // { 'workInfo.lastLoginTime': user.workInfo.lastLoginTime },
    user,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
}

function login(req, res) {
  let login = {
    email: req.body.email,
    password: req.body.password
  };

  Users.findOne({ 'personalInfo.email': login.email }, (err, user) => {
    if (!user) {
      return res.json({
        success: false,
        message: 'email or password incorrect'
      });
    } else {
      if (user.personalInfo.password !== login.password) {
        return res.status(401).send('wrong password');
      }
      sendToken(user, res);
    }
  });
}

function sendToken(user, res) {
  const token = jwt.sign({ userID: user._id }, '123');
  res.json({
    userID: user._id,
    email: user.personalInfo.email,
    firstName: user.personalInfo.firstName,
    lastName: user.personalInfo.lastName,
    picture: user.personalInfo.picture,
    token: token,
    expiresIn: 3600
  });
}

// Any functions we create, we want to return these functions to the express app to use.
module.exports = { listAllUsers, findUserByEmail, create, update, login };
