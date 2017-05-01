var app = angular.module('BBApp', []);

app.controller('MainController', ['$http', function($http){
    var controller = this;
    this.url = 'http://locallhost:3000/';
    this.user = {};

    this.login = function(userInfo){
        console.log(userInfo);
        $http({
            method:'POST',
            url: "/api/authenticate",
            data: {
                // user: {
                    username: userInfo.username,
                    password: userInfo.password
                // }
            }
        }).then(function(response){
            console.log(response);
            controller.user = response.data.username;
            console.log(controller.user);
            localStorage.setItem('token', JSON.stringify(response.data.token));
        }.bind(this));
    };

    this.getUsers = function(){
        console.log("in get");
        $http({
            // url: this.url + 'api/users',
            url: '/api/users',
            method: 'GET',
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){
            console.log(response);
            if (response.data.status == 401) {
                this.error = "Unauthorized";
            } else {
                this.users = response.data;
            }
        }.bind(this));

    };

    this.logout = function(){
        localStorage.clear('token');
        location.reload();
    };
}]);
