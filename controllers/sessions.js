//--------------------Node Module Requirements
var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var bcrypt = require('bcrypt');
var session = require('express-session');

//-------------------Routes
//SESSION GET ROUTE
router.get('/new', function(req, res){
    // res.render('', {
    //     currentUser: req.session.currentuser
    // }); --for when we're ready  --for when we're ready
    res.send("Yo, Yo, New Session Route");
});
//SESSION POST ROUTE
router.post('/', function(req, res){
    User.findOne({username: req.body.username}, function(err, foundUser){
        if(!foundUser){
            // res.redirect('');--if the user is not an account owner, redirect to the account creation section/page
            res.send('created new user')
        }
        else if( bcrypt.compareSync(req.body.password, foundUser.password) ){
            req.session.currentuser = foundUser;
            // res.redirect(''); -- once account created, redirect new user to main page or section
            res.send("welcome to the community");
        } else {
            console.log("allo");
        }
    });
});

//SESSION DELETE ROUTE
router.delete('/', function(req, res){
    req.session.destroy(function(){
        // res.redirect('/');  --for when we're ready
        res.send("Yo, YO, You're logged out")
    });
});
module.exports = router;
