'use strict';

var _ = require('underscore'),
	Templates = require('./Templates'),

	/**
	 * Manages the utilities related to the template engine.
	 * This allows an abstraction in case it must be changed at any time.
	 * Currently it is using the underscore templates.
	 * @type {Object}
	 */
	TemplateManager = {

		/**
		 * Each key is the name of a template and as value has the compiled
		 * template ready to be used.
		 * @type {Object}
		 */
		templates: Templates,

		/**
		 * Renders the template filling the variables with the ones in the context
		 * and transforms all the content into an string.
		 * @param {String} template is the name of the template to render.
		 * @param {Object} context contains all the keys and values needed to render
		 * the template.
		 * @returns {String} the stringified version of the template with the variables
		 * already replaced.
		 */
		render: function (template, context) {
			var extendedContext = JSON.parse(JSON.stringify(context)),
				computedTemplate = '',
				templates = this.templates;
			
			extendedContext._ = _;

			if (typeof templates[template] === 'function') {
				computedTemplate = templates[template](extendedContext);
			}

			return computedTemplate;
		}
	};

module.exports = TemplateManager;