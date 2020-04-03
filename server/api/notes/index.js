'use strict';
const express = require('express');
// Import the Controller so we may assign specific functions to a route
const controller = require('./notes.controller');

// Assign the route variable to an Express.Route handler
const router = express.Router();

/**
 * path: /api/notes
 * method: GET
 * function: listAllNotes() in the notes.controller.js file
 */
router.get('/', controller.listAllNotes);

/**
 * path: /api/notes
 * method: POST
 * function: create() in the notes.controller.js file
 */
router.post('/', controller.createNote);

/**
 * path: /api/feeds/:id
 * method: DELETE
 * function: update() in the notes.controller.js file
 */
router.delete('/:id', controller.deleteNote);

// We export the routes to the express app, in the routes.js file we will assign the base URL for this endpoint.
// in this file we simply want to specify the path after the base /api/users url.
module.exports = router;
