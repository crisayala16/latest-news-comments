var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NotesSchema = new Schema({
	note: {
		type: String,
		required: true
	}
});

var Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;