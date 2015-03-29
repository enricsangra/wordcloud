'use strict';

var proxyquire = require('proxyquireify')(require),
	TopicCloudController = {},
	TopicCloudRouter = proxyquire('../../JS/routers/TopicCloudRouter', {
		'../controllers/TopicCloudController': TopicCloudController
	});

describe('TopicCloudRouter', function () {
	var router;

	beforeEach(function () {
		router = new TopicCloudRouter();
		TopicCloudController.execute = jasmine.createSpy();
	});

	describe('routes', function () {
		it('sets the route for the "topicCloud" page', function () {
			expect(router.routes).toEqual(jasmine.objectContaining({
				'topic_cloud(/:id)': 'topicCloud'
			}));
		});
	});
	describe('topicCloud', function () {
		it('executes the "topicCloud" controller with the data received', function () {
			router.topicCloud('id');
			
			expect(TopicCloudController.execute).toHaveBeenCalledWith('id');
		});
	});
});