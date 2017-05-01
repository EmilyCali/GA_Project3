//require mongoose
var mongoose = require("mongoose");

//model
var bookSchema = mongoose.Schema({
  title: String,
  author: String,
  genre: String, //this is actually subject and contains multiple items
  cover: String, //in books api, is a jpg
  isbn: String, //lets you access more info
  key: String //lets you use book api to get mor info
});

//name it
var Book = mongoose.model("Book", bookSchema);

//make it accessable
module.exports = Book;


//from open libary subject is the same as genre and there may be more than one
//there is also a thmbnail_url


//use books api with key from search api to get more information about the book such as images etc
