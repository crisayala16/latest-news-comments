var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	headline: {
		type: String,
		required: true,
		unique: true
	},
	link: {
		type: String,
		required: true,
		unique: true
	},
	note: [{
		type: Schema.Types.ObjectId,
		ref: 'Note'
	}],
	saved: {
		type: Boolean,
		required: true,
		default: false
	}
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;