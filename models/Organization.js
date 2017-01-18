var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var nonGovSchema = new Schema({
	title: {
		type: String
	},
	handle:{
		type: String
	},
	person_office:{
		type: String
	},
	branch:{
		type: String
	}
});

var nonGov = mongoose.model("nonGov", nonGovSchema);
module.exports = nonGov;

//mongoimport -h ds155418.mlab.com:55418 -d heroku_nhk3bbmv --collection Organizations -u contygm -p contygm --file Organization.csv --type csv --headerline