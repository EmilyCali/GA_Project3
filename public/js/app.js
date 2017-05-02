var app = angular.module('BBApp', []);
//hello
console.log("ach");
//////////////////////////////////////////|
//----------------Amanda's controller-----|
//////////////////////////////////////////|
app.controller('MainController', ['$scope', '$http', function($scope, $http){
    var controller = this;
    this.url = 'http://locallhost:3000/';
    this.user = {};
    this.token = false;
    $scope.token = this.token;

    $scope.$watch('token', function(newValue, oldValue){
        console.log(newValue, oldValue);
        this.sendToken = function(){
            $scope.$broadcast('tokenChange', { token: controller.token});
        };
        sendToken();
    });

    // this.sendToken = function(){
    //     $scope.$broadcast('eventName', { someProperty:'someValue'});
    // };

    this.signUp = function(userInfo){
        $http({
            method:'POST',
            url: "/api/signup",
            data: {
                    username: userInfo.newUsername,
                    password: userInfo.newPassword
            }
        }).then(function(response){

            controller.username = response.data.user.username;
            // console.log(controller.user);
            localStorage.setItem('token', JSON.stringify(response.data.token));
            //post request to authenticate newly registered user
            $http({
                method:'POST',
                url: "/api/authenticate",
                data: {
                    // user: {
                        username: response.data.username,
                        password: response.data.password
                    // }
                }
            }).then(function(response){
                controller.token = true;
                $scope.token = controller.token;
            });

        }.bind(this));
        // controller.login(userInfo);
    };

    this.login = function(userInfo){
        // console.log(userInfo);
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

            controller.username = response.data.username;
            controller.token = true;
            $scope.token = controller.token;

            if(!response.data.success){
                controller.token = false;
                $scope.token = controller.token;
                controller.message = response.data.message;
            };
            localStorage.setItem('token', JSON.stringify(response.data.token));
        }.bind(this));
    };

    this.getUsers = function(){
        $http({
            // url: this.url + 'api/users',
            url: '/api/users',
            method: 'GET',
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){
            if (response.data.status == 401) {
                this.error = "Unauthorized";
            } else {
                controller.users = response.data;
            }
        }.bind(this));

    };

    this.logout = function(){
        localStorage.clear('token');
        location.reload();
    };
}]);

//////////////////////////////////////////|
//----------------Joe's controller--------|
//////////////////////////////////////////|

app.controller('baseCtrl', ['$scope','$http', function($scope, $http){
    var controller = this;
    this.token = false;
    this.searching = '';
    this.nameArr = [];
    this.infoArr = [];
    this.descriptionArr = [];

    $scope.$on('tokenChange', function(event, data){
		if(!data.token){
            controller.token = false;
        } else if(data.token){
            controller.token = true;
        };
        console.log(controller.token)
	});


    this.find = function(){
        $http(
            {
                method:'GET',
                url: 'https://api.brewerydb.com/v2/search?q=' + this.searching + '&type=beer&key=3553963f6fa0d83f188f21fcc4ac9343&format=json'
            }).then(
            function(response) { //success callback
                controller.nameArr = [];
                controller.infoArr = [];
                controller.descriptionArr = [];

                for(i=0; i< response.data.data.length; i++)
                {


                    // controller.arr.push(response.data.data[i].name);
                    controller.nameArr.push(response.data.data[i].name);
                    controller.infoArr.push(response.data.data[i].id)
                    controller.descriptionArr.push(response.data.data[i].style.description)
                }

                console.log('success');
                console.log(controller.nameArr);
                console.log(response);
                console.log(controller.infoArr);
            },
            function(error){ //fail callback
                console.log('fail');
                console.log(error);
            }
        );
    };
    this.showInfo = function(index){
        console.log(index);
        console.log(controller.infoArr[index]);
        this.showBeerId = index;
    }
}]);

//////////////////////////////////////////|
//-----------------Book controller--------|
//////////////////////////////////////////|

app.controller("BookController", ["$scope","$http", function($scope, $http) {
    //added by Amanda to check if user is logged in or not
    this.token = false;
  //have to name controller so it can be used in callbacks
  var controller = this;
  //might need to make an empty string for search and an empty array for returned database
  this.searchedBook = "";
  this.foundBooks = [];
  //function to get the books when a query happens
  this.findBook = function() {
    $http({
      method: "GET",
      //use the open library search api
      url: "http://openlibrary.org/search.json?q=" + this.searchedBook
      //may or may not need to specify data
      //data: this
    }).then(function(response) {//success
      controller.foundBooks = [];
      for(i=0; i< 10; i++)
      {
          controller.foundBooks.push(response.data.docs[i].title);
      }
      console.log(response);
      // let me see what this is
      console.log(response.data);
      //let me see what the data is
      console.log(controller.foundBooks);
      //what's in here this new array of things
      //controller.foundBooks = response.data;
      //console.log(response.data);
    },
    function(response) { //failure
      console.log(response);
    });
  };
}]);
