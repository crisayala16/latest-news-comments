var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var expressHandlebars = require('express-handlebars');
// Requiring our Note and Article models
var Note = require("./models/Notes.js");
var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();
var PORT = process.env.PORT || 8080;

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

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

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
