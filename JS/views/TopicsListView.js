'use strict';

var Backbone = require('backbone'),
	TemplateManager = require('../utils/TemplateManager'),
	TopicsListView;

Backbone.$ = require('jquery');

function addImportance(topics) {
	var i,
		total = 0,
		quarter;

	for (i = 0; i < topics.length; i++) {
		total += topics[i].volume;
	}

	quarter = (total/topics.length)/2;

	for (i = 0; i < topics.length; i++) {
		if (topics[i].volume > 0) {
			topics[i].importance = 4;
		}
		if (topics[i].volume > quarter) {
			topics[i].importance = 3;
		}
		if (topics[i].volume > quarter*2) {
			topics[i].importance = 2;
		}
		if (topics[i].volume > quarter*3) {
			topics[i].importance = 1;
		}
	}
}

TopicsListView = Backbone.View.extend({

	/**
	 * Tag name to be used for the element representing the view.
	 * @type {String}
	 */
	tagName: 'section',

	/**
	 * Class to be used for the element representing the view.
	 * @type {String}
	 */
	className: 'topic-cloud',

	/**
	 * Template with the content representing the view.
	 * @type {String}
	 */
	template: 'topics_cloud',

	/**
	 * Extends the collection information adding the importance to each element.
	 * The importance depends on the volume of the element and the mean volume
	 * in the collection.
	 * Importance 1 is for the elements whos volume is higher than three times 
	 * the half of the mean.
	 * Importance 2 is for the elements whos volume is higher than the mean but
	 * not three times the half of it.
	 * Importance 3 is for the elements whos volume is less than the mean but
	 * higher than the half of it.
	 * Importance 4 is for the rest.
	 * @return {Array} is the collection information extended with the
	 * importance for each element.
	 */
	getExtendedCollectionInfo: function () {
		var topics = [],
			i,
			total = 0,
			mean;

		if (this.collection) {
			topics = this.collection.toJSON();

			for (i = 0; i < topics.length; i++) {
				total += topics[i].volume;
			}

			mean = total/topics.length;

			for (i = 0; i < topics.length; i++) {
				topics[i].importance = 4;
				if (topics[i].volume > mean/2) {
					topics[i].importance = 3;
				}
				if (topics[i].volume > mean) {
					topics[i].importance = 2;
				}
				if (topics[i].volume > (mean + mean/2)) {
					topics[i].importance = 1;
				}
			}
		}

		return topics;
	},

	/**
	 * It renders the template passing the information related to the
	 * collection of topics to fill the placeholders.
	 * The result is set as content for the view element.
	 * @returns {Object} the instance itself.
	 */
	render: function () {
		this.el.innerHTML = TemplateManager.render(this.template, {
			topics: this.getExtendedCollectionInfo()
		});

		return this;
	}
});

module.exports = TopicsListView;