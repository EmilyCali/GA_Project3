//////////////////////////////////////////|
//----------------------------npm packages|
//////////////////////////////////////////|
var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var jwt        = require('jsonwebtoken');//used to create, sign, and verify tokens

//////////////////////////////////////////|
//---------------------------Configuration|
//////////////////////////////////////////|

var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/beerbooks';

//////////////////////////////////////////|
//------------------------------Middleware|
//////////////////////////////////////////|
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(expressJWT({secret: 'peanutbutterjellytime'}).unless({path:['/login']}));


//////////////////////////////////////////|
//-------------------Controller Middleware|
//////////////////////////////////////////|
var usersController = require('./controllers/users.js');
app.use('/users', usersController);

//////////////////////////////////////////|
//---------------------Connecting to Mongo|
//////////////////////////////////////////|
mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function(){
    console.log("===================");
    console.log("--Mongo--Connected-");
    console.log("===================");
});

//////////////////////////////////////////|
//----------------------Nodemon Connection|
//////////////////////////////////////////|
app.listen(3000, function(){
    console.log("===================");
    console.log("Tell me all things:");
    console.log("===================");
});
