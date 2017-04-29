var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//other models to require go here

var userSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
    // img: String,//a url
    // books: [Book.schema],
    // beers: [Beer.schema]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
