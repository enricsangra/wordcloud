'use strict';

var Backbone = require('backbone'),

	/**
	 * Model that manages the information related to a single topic.
	 */
	TopicModel = Backbone.Model.extend({		

		/**
		 * Initializes the model computing the dominant sentiment and the
		 * slug to be used in the url when the model must be referenced.
		 */
		initialize: function () {
			this.set('dominant_sentiment', this.getDominantSentiment());
			this.set('slug', this.getSlug());
		},
		
		/**
		 * Computes the value for the dominant sentiment.
		 * The dominant sentiment will be "positive" if its score is greater
		 * than 60, "negative" if it is lower than 40 and neutral if it is
		 * not any of them both.
		 * @return {String} the dominant sentiment for the topic.
		 */
		getDominantSentiment: function () {
			var sentimentScore = this.get('sentimentScore'),
				dominantSentiment;

			if (sentimentScore > 60) {
				dominantSentiment = 'positive';
			}
			else if (sentimentScore < 40) {
				dominantSentiment = 'negative';
			}
			else {
				dominantSentiment = 'neutral';
			}

			return dominantSentiment;
		},

		/**
		 * Gets the id modified to be used as part of an url.
		 * @return {String} the encoded id.
		 */
		getSlug: function () {
			return window.encodeURIComponent(this.get('id'));
		}
	});

module.exports = TopicModel;