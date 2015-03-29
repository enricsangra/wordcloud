'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	TopicModel = require('../models/TopicModel'),

	/**
	 * Collection that manages the information related to a list 
	 * of topics.
	 */
	TopicsCollection = Backbone.Collection.extend({

		/**
		 * Type of the elements inside the collection.
		 * @type {Object}
		 */
		model: TopicModel,
		
		/**
		 * Looks for the list of topics and stores it.
		 * It also calls the success method passed in the options with
		 * this same instance as parameter.
		 * @param {Object} options
		 * @param {Object} options.success is the method to be called after
		 * the list is fetched. The collection instance is passed as parameter.
		 * @return {Object} the instance itself.
		 */
		fetch: function (options) {
			var self = this;

			options = options || {};

			$.getJSON('./data/topics.json', function (data) {
				data = data || {};
				self.set(data.topics);
				if (typeof options.success === 'function') {					
					options.success(self);
				}
			});

			return self;
		}
	});

module.exports = TopicsCollection;