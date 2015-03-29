'use strict';

var proxyquire = require('proxyquireify')(require),
	fakeUnderscore = {},
	fakeTemplates = {
		template: 'value'
	},
	TemplateManager = proxyquire('../../JS/utils/TemplateManager', {
		'underscore': fakeUnderscore,
		'./Templates': fakeTemplates
	});

describe('TemplateManager', function () {
	describe('templates', function () {
		it('stores the compiled templates', function () {
			expect(TemplateManager.templates).toEqual(fakeTemplates);
		});
	});
	describe('render', function () {
		var templatesBackup = TemplateManager.templates,
			context;

		beforeEach(function () {
			TemplateManager.templates = {
				'test-template': jasmine.createSpy()
			};
		});
		afterEach(function () {
			TemplateManager.templates = templatesBackup;
		});

		it('calls the template method with the context passed', function () {
			context = { key: 'value' };

			TemplateManager.render('test-template', context);
			
			expect(TemplateManager.templates['test-template']).toHaveBeenCalledWith(jasmine.objectContaining(context));
		});
		it('calls the template method adding underscore to the context', function () {
			context = { key: 'value' };

			TemplateManager.render('test-template', context);

			expect(TemplateManager.templates['test-template']).toHaveBeenCalledWith(jasmine.objectContaining({
				'_': fakeUnderscore
			}));
		});
		it('does not modify the context object passed', function () {
			context = { key: 'value' };

			TemplateManager.render('test-template', context);
			
			expect(context).toEqual({ key: 'value' });
		});
		it('returns the result of applying the context to the specified template', function () {
			context = { key: 'value' };

			TemplateManager.templates['test-template'].and.returnValue('computed-template');

			expect(TemplateManager.render('test-template', context)).toEqual('computed-template');
		});
		it('returns an empty string if the template does not exist', function () {
			context = { key: 'value' };

			expect(TemplateManager.render('unexisting-template', context)).toEqual('');
		});
	});
});