var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
//require other models here
var bcrypt = require('bcrypt');
var session = require('express-session');

//USER GET ROUTE: user index--community section?
router.get('/', function(req, res){
	User.find({}, function(err, foundUsers){
		// res.render('', {
		// 	users: foundUsers,
        //     currentUser: req.session.currentuser
		// });
        res.send("all the users");
	});
});

//USER GET ROUTE: new user registration
router.get('/new', function(req, res){
    // res.render('users/new.ejs', {
    //     currentUser: req.session.currentuser
    // });
    res.send('new user registration');
});

//USER SHOW ROUTE: show individual users
router.get('/:id', function(req, res){
	// User.findById(req.params.id, function(err, foundUser){
		// res.render('users/show.ejs', {
		// 	user: foundUser,
        //     currentUser: req.session.currentuser
		// });
        res.send('This would be an individual user');
	// });
});

//USER GET ROUTE: for editing individual accounts if signed in
router.get('/:id/edit', function(req, res){
	// User.findById(req.params.id, function(err, foundUser){
        if(req.session.currentuser !== undefined){
            // res.render('users/edit.ejs', {
    		// 	user: foundUser,
            //     currentUser: req.session.currentuser
            // });
            res.send("edit my account page/section");
        } else {
            // res.redirect('');
            res.send("go log in");
		};
	// });

});

//USER POST ROUTE: creation of new user
router.post('/', function(req, res){
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));//salt that password
    User.create(req.body, function(err, createdUser){
        res.redirect('/sessions/new');

    });
});

//USER PUT ROUTE
router.put('/:id', function(req, res){
	User.findByIdAndUpdate(req.params.id, req.body, function(){
		res.redirect('/users');
	});
});

//USER DELETE ROUTE: delete my account:(
router.delete('/:id', function(req, res){
	User.findByIdAndRemove(req.params.id, function(err, foundUser){
        res.redirect('/users');
	});
});


module.exports = router;
