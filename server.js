//////////////////////////////////////////|
//----------------------------npm packages|
//////////////////////////////////////////|
var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var morgan     = require('morgan');

var jwt        = require('jsonwebtoken');//used to create, sign, and verify tokens
var config     = require('./config.js');//get config.js
var User       = require('./models/users.js');//get mongoose model

//////////////////////////////////////////|
//---------------------------Configuration|
//////////////////////////////////////////|

var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/beerbooks';
app.set('superSecret', config.secret);//secret variable

//////////////////////////////////////////|
//------------------------------Middleware|
//////////////////////////////////////////|
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('dev'));//logs requests to the console

//////////////////////////////////////////|
//-------------------Controller Middleware|
//////////////////////////////////////////|


//////////////////////////////////////////|
//-------------------API Routes-----------|
//////////////////////////////////////////|
var apiRoutes = express.Router();

//route to authenticate the user(POST: http://localhost:3000/api/authenticate)
apiRoutes.post('/authenticate', function(req, res){
    console.log(req.body.username);
    //find the user
    User.findOne({
        username:req.body.username
    }, function(err, foundUser){
        console.log(foundUser);
        if (err) throw err;
        if(!foundUser){
            res.json({success: false, message: 'Authenication failed. User not found.'});
        } else if(foundUser){
            //check if the password matches
            if(foundUser.password != req.body.password){
                res.json({ success: false, message: 'Authentication failed. Wrong password.'});
            } else {
                //if user is found and password is right, create a token:
                var token = jwt.sign(foundUser, app.get('superSecret'));
                    // expiresInMinutes: 1440 // expires in 24 hours
                // });
                //return info
                res.json({
                    username: foundUser.username,
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        };
    });
});

/////////////////////////////////////|
//------Middleware to verify token---|
/////////////////////////////////////|
apiRoutes.use(function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
    //decode token
    if(token){
        //verifies secret and checks expiration
        jwt.verify(token, app.get('superSecret'), function(err, decoded){
            if (err) {
                return res.json({ success: false, message: "Failed to authenticate token."});
            } else {
                //if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        //if there is no token, return an Error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

apiRoutes.get('/', function(req, res){
    console.log('Hello! ');
});

apiRoutes.get('/users', function(req, res){
    User.find({}, function(err, foundUsers){
        res.json(foundUsers);
    });
});

app.use('/api', apiRoutes);

//////////////////////////////////////////|
//----------------sample user data route--|
//////////////////////////////////////////|
app.get('/setup', function(req, res){
    //creating sample user
    var amanda = new User({
        username: 'capella',
        password: 'password',
        admin: true
    });
    //saving sample user
    amanda.save(function(err){
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true});
    });
});

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
