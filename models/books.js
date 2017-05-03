//require mongoose
var mongoose = require("mongoose");

//model
var bookSchema = mongoose.Schema({
  title: String,
  author_name: [String],
  publish_place: [String],
  place: String,
  first_publish_year: Number,
  publish_year: [Number],
  publish_date: [String],
  edition_count: Number,
  userId: String

  //liked: Number //lets you use book api to get mor info
  //user: String need to attach to user schema somehow
});

//name it
var Book = mongoose.model("Book", bookSchema);

//make it accessable
module.exports = Book;


//from open libary subject is the same as genre and there may be more than one
//there is also a thmbnail_url
