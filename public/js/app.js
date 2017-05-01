var app = angular.module('BBApp', []);

//////////////////////////////////////////|
//----------------Joe's controller--------|
//////////////////////////////////////////|

app.controller('baseCtrl', ['$http', function($http){
    var controller = this;
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
//----------------Amanda's controller-----|
//////////////////////////////////////////|
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
      //if you look at beer controller above it follows this structure and is working buuuut this doesn't work either way
      controller.foundBooks = [];
      for(i=0; i< response.data.length; i++)
      {
          controller.foundBooks.push(response.data[i].title);
      }
      console.log(response);
      //controller.foundBooks = response.data;
      //console.log(response.data);
    },
    function(response) { //failure
      console.log(response);
    });
  };
}]);
