'use strict';

var proxyquire = require('proxyquireify')(require),
	fakeTemplateManager = {},
	TopicsListView = proxyquire('../../JS/views/TopicsListView', {
		'../utils/TemplateManager': fakeTemplateManager
	});

describe('TopicsListView', function () {
	var view;

	beforeEach(function () {
		view = new TopicsListView();
	});

	describe('constructor', function () {
		it('generates an element that is a SECTION', function () {
			expect(view.el.tagName.toLowerCase()).toEqual('section');
		});
		it('generates an element with the class "topic-cloud"', function () {
			expect(view.el.className).toEqual('topic-cloud');
		});
		it('has assigned the "topics_cloud" template', function () {
			expect(view.template).toEqual('topics_cloud');
		});
	});
	describe('getExtendedCollectionInfo', function () {
		it('returns an empty list if there is no collection assigned to the view', function () {
			delete view.collection;

			expect(view.getExtendedCollectionInfo()).toEqual([]);
		});
		describe('when there is a collection assigned ot the view', function () {
			var element;

			beforeEach(function () {
				view.collection = {
					toJSON: jasmine.createSpy()
				}
			});

			it('adds the importance 4 when the element volume is less than the half of the volume mean', function () {
				element = {
					volume: 5
				};

				view.collection.toJSON.and.returnValue([{ volume: 20 }, element]);

				expect(view.getExtendedCollectionInfo()).toContain(jasmine.objectContaining({
					volume: 5,
					importance: 4
				}));
			});
			it('adds the importance 3 when the element volume is less than the volume meana but more than half of it', function () {
				element = {
					volume: 6
				};

				view.collection.toJSON.and.returnValue([{ volume: 0 }, element, { volume: 10 }, { volume: 15 }]);

				expect(view.getExtendedCollectionInfo()).toContain(jasmine.objectContaining({
					volume: 6,
					importance: 3
				}));
			});
			it('adds the importance 2 when the element volume is more volume mean but less than three times the half of it', function () {
				element = {
					volume: 11
				};

				view.collection.toJSON.and.returnValue([{ volume: 0 }, { volume: 5 }, element, { volume: 15 }]);
				
				expect(view.getExtendedCollectionInfo()).toContain(jasmine.objectContaining({
					volume: 11,
					importance: 2
				}));
			});
			it('adds the importance 1 when the element volume is more than three times the half of the volume mean', function () {
				element = {
					volume: 15
				};

				view.collection.toJSON.and.returnValue([{ volume: 0 }, { volume: 5 }, { volume: 10 }, element]);

				expect(view.getExtendedCollectionInfo()).toContain(jasmine.objectContaining({
					volume: 15,
					importance: 1
				}));
			});
		});
	});
	describe('render', function () {
		var compiledTemplate;
		
		beforeEach(function () {
			view.template = 'view-template';
			fakeTemplateManager.render = jasmine.createSpy();
			spyOn(view, 'getExtendedCollectionInfo');
		});
		
		it('fills the template assigned with on object having the collection information as "topics"', function () {
			view.getExtendedCollectionInfo.and.returnValue('extended-collection-info');

			view.render();

			expect(fakeTemplateManager.render).toHaveBeenCalledWith('view-template', jasmine.objectContaining({
				topics: 'extended-collection-info'
			}));
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