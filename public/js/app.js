var app = angular.module('BBApp', []);
//***********************************************************
//************************************************************
//according to https://www.w3.org/wiki/CORS_Enabled I need to put the app.all below in our code...Thom's tutorial for JWT say to "enable CORS"--this site further says we need to do this for all our routes:
// app.get('/', function(req, res, next) {
//     // Handle the get for this route
//   });
//   app.post('/', function(req, res, next) {
//     // Handle the post for this route
//   });
//************************************************************
//************************************************************
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next()
// });

app.controller('MainController', ['$http', function($http){
    var controller = this;

    //******************JWT login stuffs
    this.url = 'http://localhost:3000';
    this.user = {};
    //login(userInfo) function
    this.login = function(userInfo){
        // console.log(userInfo);
        //make a POST request to the login route and log the response
        $http({
            method: 'POST',
            url: this.url + '/users',
            data: {
                user: {
                    username: userInfo.username,
                    password: userInfo.password
                }
            }
        }).then(function(response) {
            console.log(response);
            this.user = response.data.user;
        }.bind(this));
    };
}]);
