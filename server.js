var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var expressHandlebars = require('express-handlebars');
var path = require('path');
var Notes = require("./models/Notes.js");
var Article = require("./models/Article.js");
var request = require("request");
var cheerio = require("cheerio");
var helpers = require('handlebars-helpers');
var comparison = helpers.comparison();
mongoose.Promise = Promise;

var app = express();
var PORT = process.env.PORT || 8080;

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

app.use(express.static(path.join(__dirname + '/views/public')));

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_p4pxkwkm:anh8bg9tu08v9gi5g6ob40ng2b@ds151141.mlab.com:51141/heroku_p4pxkwkm");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use(require('./controllers/homeRoutes.js'));
app.use(require('./controllers/articleRoutes.js'));


// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
