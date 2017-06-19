var express = require('express');
var Article = require('./../models/Article.js');
var Router = express.Router();


Router.get('/', function(req, res){
	Article.find()
	.exec(function(err, data){
		if(err){
			console.log(err);
		}
		else{
			res.render('index', {
				articles: data
			});
		}
	})
	
});

module.exports = Router;