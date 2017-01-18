var mongoose = require('mongoose');

var SavedArticle = require('../models/Article');
var Users = require('../models/Users');

var express = require("express");
var router = express.Router();
var stormpath = require('express-stormpath');

router.get("/", function (req, res) {
	res.render("login");
});

router.get("/saved",  stormpath.loginRequired, function (req, res) {
	res.render("SavedArticles");
});

router.get("/logout", function (req, res) {
	res.render("logout");
});
 
module.exports = router;