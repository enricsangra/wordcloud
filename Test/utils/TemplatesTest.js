'use strict';

var proxyquire = require('proxyquireify')(require),
	Templates = proxyquire('../../JS/utils/Templates', {
		'../../Templates/topic_detail.tpl': { tpl: 'topic_detail' },
		'../../Templates/topics_cloud.tpl': { tpl: 'topics_cloud' }
	});

describe('Templates', function () {
	it('"topic_detail" has assigned the "topic_detail.tpl" template', function () {
		expect(Templates.topic_detail).toEqual({ tpl: 'topic_detail' });
	});
	it('"topics_cloud" has assigned the "topics_cloud.tpl" template', function () {
		expect(Templates.topics_cloud).toEqual({ tpl: 'topics_cloud' });
	});
});