//require mongoose
var mongoose = require("mongoose");

//model
var beerSchema = mongoose.Schema({
  abv: Number,
  name: String,
  description: String,
  liked: Number,
  userId: String

});

//name it
var Beer = mongoose.model("Beer", beerSchema);

//make it accessable
module.exports = Beer;
