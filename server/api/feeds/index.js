'use strict';
const express = require('express');
// Import the Controller so we may assign specific functions to a route
const controller = require('./feeds.controller');

// Assign the route variable to an Express.Route handler
const router = express.Router();

/**
 * path: /api/feeds
 * method: GET
 * function: listAllFeeds() in the feeds.controller.js file
 */
router.get('/', controller.listAllFeeds);

/**
 * path: /api/feeds
 * method: POST
 * function: createFeed() in the feeds.controller.js file
 */
router.post('/', controller.createFeed);

/**
 * path: /api/feeds
 * method: PUT
 * function: updateFeed() in the feeds.controller.js file
 */
router.put('/:id', controller.updateFeed);

/**
 * path: /api/feeds/:id
 * method: DELETE
 * function: deleteFeed() in the feeds.controller.js file
 */
router.delete('/:id', controller.deleteFeed);

// We export the routes to the express app, in the routes.js file we will assign the base URL for this endpoint.
// in this file we simply want to specify the path after the base /api/users url.
module.exports = router;
