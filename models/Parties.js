var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PartiesSchema = new Schema({
  title:{
    type: String
  },
  handle: {
    type: String
  },
  position:{
    type: String
  },
  person_office:{
    type: String
  },
  branch:{
    type: String
  },
  party:{
    type: String
  }
});

var Parties = mongoose.model("Parties", PartiesSchema);
module.exports = Parties;
