'use strict';

var TopicsCollection = require('../collections/TopicsCollection'),
	TopicsListView = require('../views/TopicsListView'),
	TopicView = require('../views/TopicView'),

	/**
	 * Controller to be used in the TopicCloud page.
	 * It is responsible to render and display the cloud view and the
	 * detail view if needed.
	 * @type {Object}
	 */
	TopicCloudController = {
		
		/**
		 * Looks for the collection of topics and displays it and a detail
		 * view of one of the models if necessary.
		 * Once the collection is fetched, the data will not be retreived
		 * again.
		 * @param {String} id is the id corresponding to the model to be
		 * displayed in the detail view. It is an optional parameter.
		 */
		execute: function (id) {
			var self = this,
				topic;

			if (!self.topics) {
				self.topics = new TopicsCollection();
				self.topics.fetch({
					success: function (collection) {
						self.setCloudView(collection);
						if (id) {
							topic = collection.findWhere({ id: id });
							self.setDetailView(topic);
						}
						else {
							self.closeDetailView();
						}
					}
				});
			} else {
				self.setCloudView(self.topics);
				
				if (id) {
					topic = self.topics.findWhere({ id: id });
					self.setDetailView(topic);
				} else {
					self.closeDetailView();
				}
			}
		},

		/**
		 * Creates an instance of the list view in case it does not exist yet
		 * and renders and appends it to the 'content' element if not appended
		 * already.
		 * @param {Object} topics is the collection of topics to be displayed.
		 */
		setCloudView: function (topics) {
			var self = this;

			if (!self.cloudView) {
				self.cloudView = new TopicsListView({
					collection: topics
				});
			}
			
			self.cloudView.render();

			if (!self.cloudView.el.parentNode) {
				document.getElementById('content').innerHTML = '';
				document.getElementById('content').appendChild(self.cloudView.el);
			}
		},

		/**
		 * Creates an instance of the topic view in case it does not exist yet
		 * and renders and appends it to the 'content' element if not appended
		 * already.
		 * @param {Object} topic is the model of the topic to be displayed.
		 */
		setDetailView: function (topic) {
			var self = this;

			if (self.detailView) {
				self.detailView.model = topic;
			} else {
				self.detailView = new TopicView({ model: topic });
			}

			self.detailView.render();

			if (!self.detailView.el.parentNode) {
				document.getElementById('content').appendChild(self.detailView.el);
			}
		},

		/**
		 * Removes the detail view from the DOM in case it is appended.
		 */
		closeDetailView: function () {
			var detailView = this.detailView;

			if (detailView && detailView.el.parentNode) {
				detailView.el.parentNode.removeChild(detailView.el);
			}
		}
	};

module.exports = TopicCloudController;