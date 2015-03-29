'use strict';

var proxyquire = require('proxyquireify')(require),
	fakeTemplateManager = {},
	TopicView = proxyquire('../../JS/views/TopicView', {
		'../utils/TemplateManager': fakeTemplateManager
	});

describe('TopicView', function () {
	var view;

	beforeEach(function () {
		view = new TopicView();
	});

	describe('constructor', function () {
		it('generates an element that is a SECTION', function () {
			expect(view.el.tagName.toLowerCase()).toEqual('section');
		});
		it('generates an element with the class "topic-detail"', function () {
			expect(view.el.className).toEqual('topic-detail');
		});
		it('has assigned the "topic_detail" template', function () {
			expect(view.template).toEqual('topic_detail');
		});
	});
	describe('render', function () {
		beforeEach(function () {
			view.template = 'view-template';
			fakeTemplateManager.render = jasmine.createSpy();
			view.model = {
				toJSON: jasmine.createSpy().and.returnValue('model-info')
			};
		});
		
		it('fills the template assigned with the model information', function () {
			view.render();

			expect(fakeTemplateManager.render).toHaveBeenCalledWith('view-template', 'model-info');
		});
		it('fills the template assigned with an empty object if no model is available', function () {
			delete view.model;

			view.render();

			expect(fakeTemplateManager.render).toHaveBeenCalledWith('view-template', {});
		});
		it('sets the resolved template as html for the element', function () {
			fakeTemplateManager.render.and.returnValue('resolved-template');

			view.render();

			expect(view.el.innerHTML).toEqual('resolved-template');
		});
		it('returns the instance itself', function () {
			expect(view.render()).toEqual(view);
		});
	});
});