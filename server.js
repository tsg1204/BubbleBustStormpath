// Include Server Dependencies
var express = require("express");
var stormpath = require('express-stormpath');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var webpack = require('webpack');
var config = require('./webpack.config');
var client = new stormpath.Client();

// Require Schemas
var Executive = require("./models/Executive");
var Legislative = require("./models/Legislative");
var Organization = require("./models/Organization");
var Parties = require("./models/Parties");
var Article = require("./models/Article");
var User = require("./models/Users");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
mongoose.Promise = Promise;

// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 8000;

// Create Instance of Express
var app = express();
var compiler = webpack(config);

//this will allow Webpack to intercept requests and serve our packaged 

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

app.use(stormpath.init(app, {
  // Disable logging until startup, so that we can catch errors
  // and display them nicely.
  debug: 'none',
  web: {
    produces: ['application/json'],
    me: {
      expand: {
        customData: true
      }
    },
    register: {
      form: {
        fields: {
          color: {
            enabled: true,
            label: 'Color',
            placeholder: 'E.g. blue',
            type: 'text'
          }
        }
      }
    }
  }
}));

// -------------------------------------------------
app.post('/me', bodyParser.json(), stormpath.loginRequired, function (req, res) {
  function writeError(message) {
    res.status(400);
    res.json({ message: message, status: 400 });
    res.end();
  }
 
  function saveAccount () {
    req.user.givenName = req.body.givenName;
    req.user.surname = req.body.surname;
    req.user.email = req.body.email;
 
    req.user.save(function (err) {
      if (err) {
        return writeError(err.userMessage || err.message);
      }
      res.end();
    });
  }
 
  if (req.body.password) {
    var application = req.app.get('stormpathApplication');
 
    application.authenticateAccount({
      username: req.user.username,
      password: req.body.existingPassword
    }, function (err) {
      if (err) {
        return writeError('The existing password that you entered was incorrect.');
      }
 
      req.user.password = req.body.password;
 
      saveAccount();
    });
  } else {
    saveAccount();
  }
});
 
// -------------------------------------------------


//mongodb://heroku_nhk3bbmv:7dml376seb3b2ousnha7pg75s@ds155418.mlab.com:55418/heroku_nhk3bbmv

//mongoose.connect("mongodb://heroku_nhk3bbmv:7dml376seb3b2ousnha7pg75s@ds155418.mlab.com:55418/heroku_nhk3bbmv");

var databaseURi = "mongodb://localhost/bubblebust_db";

if(process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseURi);
}

var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "./public/index.html");
});

//scrape routes
require("./controllers/scrape-routes.js")(app);
// -------------------------------------------------
// mongoose logic goes here
require("./controllers/api-routes.js")(app);



app.on('stormpath.ready', function () {
  app.listen(PORT, 'localhost', function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('Listening at http://localhost:' + PORT);
  });
});


