var app = angular.module('BBApp', []);

//////////////////////////////////////////|
//----------------Amanda's controller-----|
//////////////////////////////////////////|
app.controller('MainController', ['$scope', '$http', function($scope, $http){
    var controller = this;
    this.url = 'http://locallhost:3000/';
    this.user = {};
    this.token = false;
    $scope.token = this.token;
    this.showAccount = false;

    $scope.$watch('token', function(newValue, oldValue){
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
//loginRoute
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
            console.log("response");
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
//gets all users
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

    this.showMyAccount = function(){
        this.showAccount = true;
    };

//Updates User
    this.showEdit = function(id){
        this.editableUserId = id;
    };

    this.update = function(user){
        console.log(user);
        $http({
            method:"PUT",
            url: '/api/' + user._id,
            data: user,
            header: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){
            controller.editableUserId = null;
            console.log(response);
        }.bind(this));
    };

//logs user out
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
    this.showBeerId = '';
    this.searching = '';
    this.beers = [];

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
                controller.beers = [];

                for(i=0; i< response.data.data.length; i++)
                {
                // controller.arr.push(response.data.data[i].name);
                    controller.beers.push(response.data.data[i]);
                }

                console.log('success');
                console.log(controller.beers);
            },
            function(error){ //fail callback
                console.log('fail');
                console.log(error);
            }
        );
    };
    this.showInfo = function(index){
        console.log(index);
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
  //this is the string that takes what is search in the input on html
  this.searchedBook = "";
  //these are the books you get
  this.foundBooks = [];
  //call this to get id when showing more info
  this.showBookId = "";

  $scope.$on('tokenChange', function(event, data){
      if(!data.token){
          controller.token = false;
      } else if(data.token){
          controller.token = true;
      };
      console.log(controller.token)
  });

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
      // this limits the results to ten
      for(i=0; i< 10; i++)
      {
          controller.foundBooks.push(response.data.docs[i]);
      }
      console.log(response);
      // let me see what this is
      //console.log(response.data.docs);
      //let me see what the data is
      //console.log(controller.foundBooks);
      //what's in here this new array of things
      //controller.foundBooks = response.data;
      //console.log(response.data);
    },
    function(response) { //failure
      console.log(response);
    });
  };
  //call this on click to show more information about the books
  this.showBookInfo = function(index){
      console.log(index);
      this.showBookId = index;
  };
}]);
