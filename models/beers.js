//require mongoose
var mongoose = require("mongoose");

//model
var beerSchema = mongoose.Schema({
  name: String,
  abv: Number,
  description: String,
  style: String,
  liked: Number
 
});

//name it
var Beer = mongoose.model("Beer", beerSchema);

//make it accessable
module.exports = Beer;
