'use strict';

var Backbone = require('backbone'),
	TemplateManager = require('../utils/TemplateManager'),
	TopicView;

Backbone.$ = require('jquery');

TopicView = Backbone.View.extend({
	
	/**
	 * Tag name to be used for the element representing the view.
	 * @type {String}
	 */
	tagName: 'section',

	/**
	 * Class to be used for the element representing the view.
	 * @type {String}
	 */
	className: 'topic-detail',

	/**
	 * Template with the content representing the view.
	 * @type {String}
	 */
	template: 'topic_detail',

	/**
	 * It renders the template passing the information related to the
	 * topic assigned to the view to fill the placeholders.
	 * The result is set as content for the view element.
	 * @returns {Object} the instance itself.
	 */
	render: function () {
		var context = {};

		if (this.model) {
			context = this.model.toJSON();
		}

		this.el.innerHTML = TemplateManager.render(this.template, context);
		
		return this;
	}
});

module.exports = TopicView;