//require express
var express = require("express");
//name
var router = express.Router();
//require model
var Book = require("../models/books.js");

//index route
router.get("/", function(request, response) {
  //console.log("index");
  Book.find({}, function(error, foundBook) {
    if (error) {
      console.log(error);
    }
    response.json(foundBook);
  });
});

//create route
router.post("/", function(request, response) {
  //console.log("create route accessed");
  Book.create(request.body, function(error, createdBook) {
    if (error) {
      console.log(error);
    }
    response.json(createdBook);
  });
}); //create a push of the isbn so you can access later

//update route
router.put("/:id", function(request, response) {
  //console.log("edit accessed");
  Book.findByIdAndUpdate(request.params.id, request.body, {new: true}, function(error, updatedBook) {
    if (error) {
      console.log(error);
    }
    response.json(updatedBook);
  });
});

//delete route
router.delete("/:id", function(request, response) {
  //console.log("delete");
  Book.findByIdAndRemove(request.params.id, function(error, deletedBook) {
    if (error) {
      console.log(error);
    }
    response.json(deletedBook);
  });
});


module.exports = router;
