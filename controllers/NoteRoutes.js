var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var helpers = require('handlebars-helpers');
var comparison = helpers.comparison();
var Article = require('./../models/Article.js');
var Note = require('./../models/Note.js');

var Router = express.Router();

Router.post('/saveNote/:articleId', function(req, res){
	var articleId = req.params.articleId;
	var note = req.body.note;
	var newNote = new Note({
		note: note
	});
	newNote.save(function(err, doc){
		if(err){
			console.log(err);
		}
		else{
			console.log(doc);
			Article.findOneAndUpdate({ "_id": articleId}, {$push: {"note": doc._id}})
	      // Execute the above query
	      .exec(function(err, doc) {
	        // Log any errors
	        if (err) {
	        	console.log(err);
	        }
	        else {
	        	console.log('second Route');
	        	console.log(doc);
	          // Or send the document to the browser
	          res.redirect('/savedArticles');
	      }
  		});
  	}
});
});

Router.post('/deleteNote/:id', function(req, res){
	var noteId = req.params.id;
	Note.remove({
		'_id': noteId
	},
	function(err){
		if(err){
			console.log(err);
		}
		else{
			res.redirect('/savedArticles');
		}
	});
});

module.exports = Router;