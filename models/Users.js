// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create user schema
var UserSchema = new Schema({
  //  is a required string
  name: {
    type: String,
    required: true
  },
  //  is a required string
  password: {
    type: String,
    required: true
  }
});

// Create the Article model with the ArticleSchema
var User = mongoose.model("Users", UserSchema);

// Export the model
module.exports = User;