var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var helpers = require('handlebars-helpers');
var comparison = helpers.comparison();
var Article = require('./../models/Article.js');

var Router = express.Router();

Router.get('/scrape', function(req, res){
	request('https://www.nytimes.com/', function(errr, response, html){
		var $ = cheerio.load(html);
		var result = [];
		$('article.story.theme-summary').each(function(i, element){
			var headline = $(element).find('h2.story-heading').find('a').text();
			var link = $(element).find('h2.story-heading').find('a').attr('href');
			if(i < 20){
				if(headline !== ""){
					var newArt = new Article({
						headline: headline,
						link: link
					});

					newArt.save(function(err, doc){
						if(err){
							console.log(err);
						}
					})
				}
			}
		});
		res.redirect('/');
	});
});
Router.post('/saveArticle/:id', function(req, res){
	var id = req.params.id;
	Article.update(
		{'_id': id},
		{'saved': true},
		function(err, doc){
			if(err){
				console.log(err);
			}
		}
	);
	res.redirect('/');
});

Router.get('/savedArticles', function(req, res){
	Article.find({saved: true})
	.exec(function(err, doc){
		if(err){
			console.log(err);
		}
		else{
			res.render('articles', {
				saved: doc
			})
		}
	});
})

module.exports = Router;