// var express = require('express');
// var router  = express.Router();
// var User    = require('../models/users.js');
// var jwt     = require('jsonwebtoken');//used to create, sign, and verify tokens
//



// router.post('/authenticate', function(req, res){
//     console.log(req.query.username);
//     //find the user
//     User.findOne({
//         username:req.query.username
//     }, function(err, foundUser){
//         console.log(foundUser);
//         if (err) throw err;
//         if(!foundUser){
//             res.json({success: false, message: 'Authenication failed. User not found.'});
//         } else if(foundUser){
//             //check if the password matches
//             if(foundUser.password != req.query.password){
//                 res.json({ success: false, message: 'Authentication failed. Wrong password.'});
//             } else {
//                 //if user is found and password is right, create a token:
//                 var token = jwt.sign(foundUser, router.get('superSecret'), {
//                     expiresInMinutes: 1440 //expires in 24 hours
//                 });
//                 //return info
//                 res.json({
//                     success: true,
//                     message: 'Enjoy your token!',
//                     token: token
//                 });
//             }
//         };
//     });
// });
//
// /////////////////////////////////////|
// //---------------------Middleware----|
// /////////////////////////////////////|
// router.use(function(req, res, next){
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     console.log(token);
//     //decode token
//     if(token){
//         //verifies secret and checks expiration
//         jwt.verify(token, app.get('superSecret'), function(err, decoded){
//             if (err) {
//                 return res.json({ success: false, message: "Failed to authenticate token."});
//             } else {
//                 //if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         //if there is no token, return an Error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//     }
// });
//
// router.get('/', function(req, res){
//     console.log('Hello! ');
// });
//
// router.get('/users', function(req, res){
//     User.find({}, function(err, foundUsers){
//         res.json(foundUsers);
//     });
// });


// module.exports = router;
