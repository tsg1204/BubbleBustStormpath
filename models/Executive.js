// ALSO WORKS FOR JUDICIAL
// there's only one entry and it follows the model


var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ExecutiveSchema = new Schema({
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

var Executive = mongoose.model("Executive", ExecutiveSchema);
module.exports = Executive;