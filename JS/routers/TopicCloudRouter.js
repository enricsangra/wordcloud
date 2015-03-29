'use strict';

var Backbone = require('backbone'),
	TopicCloudController = require('../controllers/TopicCloudController'),
	TopicCloudRouter;

/**
 * Router to manage the urls related to the topic cloud.
 */
TopicCloudRouter = Backbone.Router.extend({

	/**
	 * Contains the possible url patterns and the method to
	 * be executed when it matches.
	 * @type {Object}
	 */
	routes: {
		'topic_cloud(/:id)': 'topicCloud'
	},

	/**
	 * Displays the cloud of topics and the details of one of the 
	 * topics if an id is passed.
	 * @param {String} id is the id of the model to display its
	 * details. It is an optional parameter.
	 */
	topicCloud: function (id) {
		TopicCloudController.execute(id);
	}
});
module.exports = TopicCloudRouter;