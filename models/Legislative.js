var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LegistlativeSchema = new Schema({
  title:{
    type: String
  },
  state: {
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
  handle:{
    type: String
  },
  party:{
    type: String
  }
});

var Legistlative = mongoose.model("Legistlative", LegistlativeSchema);
module.exports = Legistlative;
