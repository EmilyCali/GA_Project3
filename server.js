//===================================
//------------------------npm Require
//===================================
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');


var app = express();
//===================================
//-------------------------Middleware
//===================================

app.use(bodyParser.json());
app.use(express.static('public'));


//===================================
//------------------------Controllers
//===================================

// *********FAUX CONTROLLER FOR EXAMPLE LATER*********
// var someController = require('./controllers/someModel.js');
// app.use('/someModel.js', someController);


//===================================
//----------------Connecting to Mongo
//===================================

mongoose.connect('mongodb://localhost:27017/beerbooks');
mongoose.connection.once('open', function(){
    console.log("===================");
    console.log("--Mongo--Connected-");
    console.log("===================");
});

//===================================
//-----------------Nodemon Connection
//===================================

app.listen(3000, function(){
    console.log("===================");
    console.log("Tell me all things:");
    console.log("===================");
});
