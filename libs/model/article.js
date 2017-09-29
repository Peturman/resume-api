var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

// Article
var Images = new Schema({
	kind: {
		type: String,
		enum: ['thumbnail', 'detail'],
		required: true
	},
	url: { type: String, required: true }
});

var Article = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	description: { type: String, required: true },
	content: { type: String, required: true },
	images: [Images],
    tags: { type: String, required: true },
    sort: { type: String, required: true },
	modified: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }
});

Article.path('title').validate(function (v) {
	return v.length > 1 && v.length < 70;
});

module.exports = mongoose.model('Article', Article);