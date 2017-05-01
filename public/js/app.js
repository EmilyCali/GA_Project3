var app = angular.module('BBApp', []);

app.controller('MainController', ['$http', function($http){
    var controller = this;
    this.url = 'http://locallhost:3000/';
    this.user = {};

    this.login = function(userInfo){
        console.log(userInfo);
        $http({
            method:'POST',
            url: this.url = "/api",
            data: {
                // user: {
                    username: userInfo.username,
                    password: userInfo.password
                // }
            }
        }).then(function(response){
            console.log(response);
            this.user = response.data.user;
            localStorage.setItem('token', JSON.stringify(response.data.token));
        }.bind(this));
    };
}]);
