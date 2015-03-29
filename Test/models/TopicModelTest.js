'use strict';

var TopicModel = require('../../JS/models/TopicModel');

describe('TopicModel', function () {
	beforeEach(function () {
		spyOn(TopicModel.prototype, 'initialize');
	});

	describe('initialize', function () {
		beforeEach(function () {
			spyOn(TopicModel.prototype, 'set');
			spyOn(TopicModel.prototype, 'getDominantSentiment');
		})
		it('sets the dominant sentiment to the model', function () {
			var topic = new TopicModel();

			TopicModel.prototype.initialize.and.callThrough();
			TopicModel.prototype.getDominantSentiment.and.returnValue('dominant-sentiment');

			topic.initialize();

			expect(TopicModel.prototype.set).toHaveBeenCalledWith('dominant_sentiment', 'dominant-sentiment');
		});
	});
	describe('getDominantSentiment', function () {
		var topic,
			score;

		beforeEach(function () {
			topic = new TopicModel();
			spyOn(topic, 'get').and.callFake(function (attribute) {
				if (attribute === 'sentimentScore') {
					return score;
				}
			});
		});
		it('returns "positive" as dominant sentient if the sentiment score is higher than 60', function () {
			score = 70;

			expect(topic.getDominantSentiment()).toEqual('positive');
		});
		it('returns "neutral" as dominant sentient if the sentiment score is exactly 60', function () {
			score = 60;

			expect(topic.getDominantSentiment()).toEqual('neutral');
		});
		it('returns "negative" as dominant sentient if the sentiment score is lower than 40', function () {
			score = 30;

			expect(topic.getDominantSentiment()).toEqual('negative');
		});
		it('returns "neutral" as dominant sentient if the sentiment score is exactly 40', function () {
			score = 40;

			expect(topic.getDominantSentiment()).toEqual('neutral');
		});
		it('returns "neutral" as dominant sentient if the sentiment score is between 40 and 60', function () {
			score = 50;

			expect(topic.getDominantSentiment()).toEqual('neutral');
		});
	});
});