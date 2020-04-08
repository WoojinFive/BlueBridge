'use strict';
const express = require('express');
// Import the Controller so we may assign specific functions to a route
const controller = require('./users.controller');

// Assign the route variable to an Express.Route handler
const router = express.Router();

/**
 * path: /api/users
 * method: GET
 * function: listAllUsers() in the users.controller.js file
 */
router.get('/', controller.listAllUsers);

/**
 * path: /api/users/:email
 * method: GET
 * function: findUserByEmail() in the users.controller.js file
 */
router.get('/:email', controller.findUserByEmail);

/**
 * path: /api/users
 * method: POST
 * function: create() in the users.controller.js file
 */
router.post('/', controller.create);

/**
 * path: /api/users
 * method: PUT
 * function: update() in the users.controller.js file
 */
router.put('/', controller.update);

/**
 * path: /api/users
 * method: POST
 * function: login() in the users.controller.js file
 */
router.post('/login', controller.login);

// We export the routes to the express app, in the routes.js file we will assign the base URL for this endpoint.
// in this file we simply want to specify the path after the base /api/users url.
module.exports = router;
