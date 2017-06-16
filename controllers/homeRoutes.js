var express = require('express');
var router = express.Router();

var Router = express.Router();

Router.get('/', function(req, res){
	res.render('index');
});

module.exports = Router;