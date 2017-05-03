var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//other models to require go here


//////////////////////////////////////////|
//------------------------------Schema----|
//////////////////////////////////////////|

var userSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false},
    pair: {
        beer: String,
        book: String
    }
    // img: String,//a url
    // books: [Book.schema], //incase?
    // beers: [Beer.schema] //incase?
});


var User = mongoose.model('User', userSchema);

module.exports = User;
