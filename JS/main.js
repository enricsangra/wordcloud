'use strict';

var TopicCloudRouter = require('./routers/TopicCloudRouter'),
	Backbone = require('backbone'),
	router;

/**
 * Initializes the router and the application to start listening to the
 * hash URLs.
 */
document.addEventListener("DOMContentLoaded", function () {
	router = new TopicCloudRouter();
	Backbone.history.start();
});