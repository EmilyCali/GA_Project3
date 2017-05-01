//following scotch.io tutorial: https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

module.exports = {
    //for when we create and verify JWTs:
    'secret': 'peanutbutterjellytime',
    'database': 'mongodb://localhost:27017/beerbooks'

};
