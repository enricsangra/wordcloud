'use strict';

var jquery = {},
	proxyquire = require('proxyquireify')(require),
	TopicModel = jasmine.createSpy(),
	TopicsCollection = proxyquire('../../JS/collections/TopicsCollection', {
		'../models/TopicModel': TopicModel,
		'jquery': jquery
	});

describe('TopicsCollection', function () {
	var collection;

	beforeEach(function () {
		collection = new TopicsCollection([]);
	});

	describe('constructor', function () {
		it('it is a collection of TopicModel', function () {
			expect(collection.model).toEqual(TopicModel);
		});
	});
	describe('fetch', function () {
		var DATA_URL = './data/topics.json';

		beforeEach(function () {
			jquery.getJSON = jasmine.createSpy();
			spyOn(collection, 'set');
		});

		it('gets the "topics.json" and sets the topics to the collection when finished', function () {
			var data = {
					topics: 'topic-list'
				};

			collection.fetch();

			expect(jquery.getJSON).toHaveBeenCalledWith(DATA_URL, jasmine.any(Function));
			jquery.getJSON.calls.first().args[1](data);

			expect(collection.set).toHaveBeenCalledWith('topic-list');
		});
		it('gets the "topics.json" and executes the success method passed when finished', function () {
			var options = {
					success: jasmine.createSpy()
				};

			collection.fetch(options);

			expect(jquery.getJSON).toHaveBeenCalledWith(DATA_URL, jasmine.any(Function));
			jquery.getJSON.calls.first().args[1]();

			expect(options.success).toHaveBeenCalled();
		});
		it('gets the "topics.json" and executes the success method passing the collection instance when finished', function () {
			var options = {
					success: jasmine.createSpy()
				};

			collection.fetch(options);

			expect(jquery.getJSON).toHaveBeenCalledWith(DATA_URL, jasmine.any(Function));
			jquery.getJSON.calls.first().args[1]();

			expect(options.success).toHaveBeenCalledWith(collection);
		});
		it('does not fail when the success method is not a function but it gets the data', function () {
			var options = {
					success: 'not-a-function'
				};

			collection.fetch(options);

			expect(function () {
				jquery.getJSON.calls.first().args[1]();
			}).not.toThrow();
		});
		it('returns the collection instance', function () {
			expect(collection.fetch()).toEqual(collection);
		});
	});
});