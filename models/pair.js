var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//other models to require go here


//////////////////////////////////////////|
//------------------------------Schema----|
//////////////////////////////////////////|

var pairSchema = Schema({
    beer: String,
    book: String,
    userId: String
});


var Pair = mongoose.model('Pair', pairSchema);

module.exports = Pair;
