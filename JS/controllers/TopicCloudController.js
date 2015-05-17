'use strict';

var TopicsCollection = require('../collections/TopicsCollection'),
	TopicsListView = require('../views/TopicsListView'),
	TopicView = require('../views/TopicView'),
	TopicCloudController;

/**
 * Displays the cloud view and the detail view if an id is passed.
 * In case no id is passed, the current detail view will be closed
 * if it is currently being displayed.
 * 
 * @param {Object} controller is the instance of the controller which
 * manages the views.
 * @param {Object} collection contains the list of topics to display in
 * the list view.
 * @param {String} id is the identifier of the model to be displayed in
 * the detail view.
 */
function displayViews(controller, collection, id) {
	var topic;

	controller.setCloudView(collection);

	if (id) {
		topic = collection.findWhere({ id: id });
		controller.setDetailView(topic);
	} else {
		controller.closeDetailView();
	}
}

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
					displayViews(self, collection, id);
				}
			});
		} else {
			displayViews(self, self.topics, id);
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