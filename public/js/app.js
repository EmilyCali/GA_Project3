var app = angular.module('BBApp', []);

//////////////////////////////////////////|
//----------------Joe's controller--------|
//////////////////////////////////////////|

app.controller('baseCtrl', ['$http', function($http){
    var controller = this;
    this.token = false;
    this.searching = '';
    this.nameArr = [];
    this.infoArr = [];
    this.descriptionArr = [];
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
                    console.log('hi');

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
//----------------Amanda's controller-----|
//////////////////////////////////////////|
app.controller('MainController', ['$http', function($http){
    var controller = this;
    this.url = 'http://locallhost:3000/';
    this.user = {};
    this.token = false;

    this.secretStuff = function(){
        console.log(localStorage);
    };

    this.signUp = function(userInfo){
        console.log(userInfo);
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
            console.log(response);
            controller.username = response.data.username;
            controller.token = true;
            console.log(response.data.message);
            if(!response.data.success){
                controller.message = response.data.message;
                controller.token = false;
            };
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
                controller.users = response.data;
                console.log(controller.users);
            }
        }.bind(this));

    };

    this.logout = function(){
        localStorage.clear('token');
        location.reload();
    };
}]);

//////////////////////////////////////////|
//-----------------Book controller-----|
//////////////////////////////////////////|

app.controller("BookController", ["$http", function($http) {
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
