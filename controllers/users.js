var express = require('express');
var router = express.Router();
var User = require('../models/users.js');

//get route for all users
router.get('/', function(req, res){
    User.find({}, function(err, foundUsers){
        res.json(foundUsers);
        // res.send('connected')
    });
});

router.get('/login', function(req, res){
    User.find({}, function(err, foundUsers){
        res.json(foundUsers);
    });
});

//route for showing one user
router.get('/:id', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        res.json(foundUser);
    });
});
//route for posting the creation of a user...
router.post('/login', function(req, res){
    if(!req.body.username){
        res.status(400).send('username required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    User.findOne({username: req.body.username}, function(err, foundUser){
        foundUser.comparePassword(req.body.password, function(err, isMatch){
            iff(err) throw err;
            if(!isMatch){
                res.status(401).send('Invalid Password');
            } else {
                res.status(200).json({});
            }
        });
    });
});
//route for editing a user
router.put('/:id', function(req, res){
    //-----find this guy-
    //---------------------update it to this
    //---------------------------------callback gets updated model
    //----------------------------------------------------------callback function
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updatedUser){
        if(err){
            res.json(err);
        }
        res.json(updatedUser);
    });
});
//route for deleting user
router.delete('/:id', function(req, res){
    User.findByIdAndRemove(req.params.id, function(err, deletedUser){
        if(err){
            res.json(err);
        }
        res.json(deletedUser);
    });
});

module.exports = router;
