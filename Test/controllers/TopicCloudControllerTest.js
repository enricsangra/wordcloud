'use strict';

var jquery = {},
	proxyquire = require('proxyquireify')(require),
	TopicsCollection = jasmine.createSpy(),
	TopicsListView = jasmine.createSpy(),
	TopicView = jasmine.createSpy(),
	TopicCloudController = proxyquire('../../JS/controllers/TopicCloudController', {
		'../collections/TopicsCollection': TopicsCollection,
		'../views/TopicsListView': TopicsListView,
		'../views/TopicView': TopicView,
		'jquery': jquery
	});

describe('TopicCloudController', function () {
	describe('execute', function () {
		var collectionInstance;
		
		beforeEach(function () {
			collectionInstance = {
				fetch: jasmine.createSpy(),
				findWhere: jasmine.createSpy()
			};
			TopicsCollection.and.callFake(function () {
				return collectionInstance;
			});
			spyOn(TopicCloudController, 'setCloudView');
			spyOn(TopicCloudController, 'setDetailView');
			spyOn(TopicCloudController, 'closeDetailView');
		})
		describe('when the data has not been retreived yet', function () {
			var collection;

			beforeEach(function () {
				delete TopicCloudController.topics;
			});

			it('retreives the data from a "TopicsCollection" and sets the cloud view with it', function () {
				TopicCloudController.execute();

				expect(collectionInstance.fetch).toHaveBeenCalledWith(jasmine.objectContaining({
					success: jasmine.any(Function)
				}));
				collectionInstance.fetch.calls.first().args[0].success(collectionInstance);

				expect(TopicCloudController.setCloudView).toHaveBeenCalledWith(collectionInstance);
				expect(TopicCloudController.setCloudView.calls.first().object).toEqual(TopicCloudController);
			});
			it('retreives the data from a "TopicsCollection" and sets the detail view with the specified model', function () {
				collectionInstance.findWhere.and.callFake(function (filter) {
					if (filter.id === 'id') {
						return 'element'
					}
				});
				TopicCloudController.execute('id');

				expect(collectionInstance.fetch).toHaveBeenCalledWith(jasmine.objectContaining({
					success: jasmine.any(Function)
				}));
				collectionInstance.fetch.calls.first().args[0].success(collectionInstance);

				expect(TopicCloudController.setDetailView).toHaveBeenCalledWith('element');
				expect(TopicCloudController.setDetailView.calls.first().object).toEqual(TopicCloudController);
			});
			it('stores the topics for future uses', function () {
				TopicCloudController.execute();

				expect(TopicCloudController.topics).toEqual(collectionInstance);
			});		
		});
		describe('when the data has been already retreived', function () {
			beforeEach(function () {
				TopicCloudController.topics = collectionInstance;
			});

			it('sets the cloud view with the topics stored', function () {
				TopicCloudController.execute();

				expect(TopicCloudController.setCloudView).toHaveBeenCalledWith(collectionInstance);
			});
			it('sets the detail view if a specific topic is required to be displayed passing the model', function () {
				collectionInstance.findWhere.and.callFake(function (filter) {
					if (filter.id === 'id') {
						return 'element'
					}
				});

				TopicCloudController.execute('id');

				expect(TopicCloudController.setDetailView).toHaveBeenCalledWith('element');
			});
			it('closes the detail view if no topic is required to be displayed', function () {
				TopicCloudController.execute();

				expect(TopicCloudController.closeDetailView).toHaveBeenCalled();
			});
		});
	});
	describe('setCloudView', function () {
		var contentElement,
			viewElement,
			cloudView;

		beforeEach(function () {
			viewElement = {};
			cloudView = {
				render: jasmine.createSpy(),
				el: viewElement
			};
			contentElement = {
				appendChild: jasmine.createSpy(),
				innerHTML: ''
			};
			spyOn(document, 'getElementById').and.callFake(function (id) {
				if (id === 'content') {
					return contentElement;
				}
			});
		});

		describe('when the view is needed for the first time', function () {			
			beforeEach(function () {
				delete TopicCloudController.cloudView;				
				TopicsListView.and.callFake(function (options) {
					if (options.collection === 'topics') {
						return cloudView; 
					}
				});
			});

			it('renders the view with the topics passed', function () {
				TopicCloudController.setCloudView('topics');

				expect(cloudView.render).toHaveBeenCalled();
			});
			it('stores the view created for the cloud', function () {
				TopicCloudController.setCloudView('topics');

				expect(TopicCloudController.cloudView).toEqual(cloudView);
			});
			it('appends the view to the "content" element to display its content if it was not appended yet', function () {
				viewElement.parentNode = null;

				TopicCloudController.setCloudView('topics');

				expect(contentElement.appendChild).toHaveBeenCalledWith(viewElement);
			});
			it('deletes what is inside the "content" element before appending the view element', function () {
				contentElement.innerHTML = '<p>other content</p>';

				TopicCloudController.setCloudView('topics');

				expect(contentElement.innerHTML).toEqual('');
			});
			it('does not append the view to the "content" element if it it is already in the DOM', function () {
				viewElement.parentNode = contentElement;

				TopicCloudController.setCloudView('topics');

				expect(contentElement.appendChild).not.toHaveBeenCalled();
			});
			it('does not delete what is inside the "content" element if it is not appended', function () {
				viewElement.parentNode = contentElement;
				contentElement.innerHTML = '<p>other content</p>';

				TopicCloudController.setCloudView('topics');

				expect(contentElement.innerHTML).toEqual('<p>other content</p>');
			});
		});
		describe('when the view has been already created', function () {
			beforeEach(function () {
				TopicCloudController.cloudView = cloudView;				
			});

			it('is re-rendered', function () {
				TopicCloudController.setCloudView();

				expect(cloudView.render).toHaveBeenCalled();
			});
			it('appends the view to the "content" element to display its content if it was not appended yet', function () {
				viewElement.parentNode = null;

				TopicCloudController.setCloudView('topics');

				expect(contentElement.appendChild).toHaveBeenCalledWith(viewElement);
			});
			it('deletes what is inside the "content" element before appending the view element', function () {
				contentElement.innerHTML = '<p>other content</p>';

				TopicCloudController.setCloudView('topics');

				expect(contentElement.innerHTML).toEqual('');
			});
			it('does not append the view to the "content" element if it it is already in the DOM', function () {
				viewElement.parentNode = contentElement;

				TopicCloudController.setCloudView('topics');

				expect(contentElement.appendChild).not.toHaveBeenCalled();
			});
			it('does not delete what is inside the "content" element if it is not appended', function () {
				viewElement.parentNode = contentElement;
				contentElement.innerHTML = '<p>other content</p>';

				TopicCloudController.setCloudView('topics');

				expect(contentElement.innerHTML).toEqual('<p>other content</p>');
			});
		});
	});
	describe('setDetailView', function () {
		var contentElement,
				detailView;

		beforeEach(function () {
			detailView = {
				render: jasmine.createSpy(),
				el: {}
			};
			TopicCloudController.detailView = detailView;
			TopicView.and.callFake(function (options) {
				if (options.model === 'topic') {
					return detailView; 
				}
			});
			contentElement = {
				appendChild: jasmine.createSpy(),
				innerHTML: ''
			};
			spyOn(document, 'getElementById').and.callFake(function (id) {
				if (id === 'content') {
					return contentElement;
				}
			});
		});

		describe('when the view is needed for the first time', function () {
			beforeEach(function () {
				delete TopicCloudController.detailView;
				detailView.el = 'view-element';
			});

			it('renders the view with the topic', function () {
				TopicCloudController.setDetailView('topic');

				expect(detailView.render).toHaveBeenCalled();
			});
			it('stores the view created for the topic', function () {
				TopicCloudController.setDetailView('topic');

				expect(TopicCloudController.detailView).toEqual(detailView);
			});
			it('appends the view to the "content" element to display its content', function () {
				TopicCloudController.setDetailView('topic');

				expect(contentElement.appendChild).toHaveBeenCalledWith(detailView.el);
			});
		});
		describe('when the view has been already created', function () {
			beforeEach(function () {
				detailView.el = {};
			});

			it('sets the topic as model for the view', function () {
				TopicCloudController.setDetailView('topic');

				expect(detailView.model).toEqual('topic');
			});
			it('re-renders the view', function () {
				TopicCloudController.setDetailView('topic');
				
				expect(detailView.render).toHaveBeenCalled();
			});
			it('appends the view to the "content" element to display its content if it was not in the DOM yet', function () {
				TopicCloudController.setDetailView('topic');

				expect(contentElement.appendChild).toHaveBeenCalledWith(detailView.el);
			});
			it('does not append the view to the "content" element to display its content if it was in the DOM already', function () {
				detailView.el.parentNode = contentElement;

				TopicCloudController.setDetailView('topic');

				expect(contentElement.appendChild).not.toHaveBeenCalledWith(detailView.el);
			});
		});
	});
	describe('closeDetailView', function () {
		var element;

		beforeEach(function () {
			element = {
				parentNode: {
					removeChild: jasmine.createSpy()
				}
			};

			TopicCloudController.detailView = {
				el: element
			};
		});

		it('removes the view element from the DOM', function () {
			TopicCloudController.closeDetailView();

			expect(element.parentNode.removeChild).toHaveBeenCalledWith(element);
		});
		it('does not throw an error when the view does not exist', function () {
			delete TopicCloudController.detailView;

			expect(function () {
				TopicCloudController.closeDetailView();
			}).not.toThrow();
		});
		it('does not throw an error when the element is already out of the DOM', function () {
			element.parentNode = null;

			expect(function () {
				TopicCloudController.closeDetailView();
			}).not.toThrow();
		});
	});
});
