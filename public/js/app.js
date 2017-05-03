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

    //////////JOE VARIABLES/////////
    this.showBeerId = '';
    this.searching = '';
    this.beers = [];

    this.selectedBooksBeers = [];

    this.isSelected = true;
    // $scope.isSelected = this.isSelected;

    ///////////EMILY VARIABLES////////////
    //this is the string that takes what is search in the input on html
    this.searchedBook = "";
    //these are the books you get
    this.foundBooks = [];
    //call this to get id when showing more info
    this.showBookId = "";
    this.selectedBooks = [];
    this.hideStuff = false;


//*************************sign up
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
//****************************loginRoute
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
            controller.id = response.data.id,
            //console.log(controller.id);
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
//***************************** gets all users
    this.getUsers = function(){
        $http({
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
//******************************** my account
    this.showMyAccount = function(id){
        this.showAccount = true;
        $http({
            url: '/api/' + id,
            method: 'GET',
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){
            console.log(response);
            if (response.data.status == 401) {
                this.error = "Unauthorized";
            } else {
                controller.user = response.data;
            }
        }.bind(this));
    };
//********************************* Updates User
    this.showEdit = function(){
        console.log('clicked');
        this.showEditForm = true;
        this.showAccount = false;
    };

    this.update = function(user, id){
        console.log(user);
        console.log(id);
        $http({
            method:"PUT",
            url: '/api/' + id,
            data: user,
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){
            controller.editableUserId = null;
            this.showEditForm = false;
            this.showAccount = true;
            controller.editableUserId = null;
            this.showMyAccount(response.data._id);
            console.log(response);
        }.bind(this));

    };
//logs user out
    this.logout = function(){
        localStorage.clear('token');
        location.reload();
    };
//time to make a pair
    this.pair = function(beerName, bookName){
        $http({
            method:'PUT',
            url: '/api/pair',
            data: {
                pair: {
                    beer: beerName,
                    book: bookName,
                }
            },
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){
            console.log(response);
        });
    };

//////////////////////////////////////////|
//----------------Joe's code--------------|
//////////////////////////////////////////|

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
        // console.log(index);
        this.showBeerId = index;

    };
    this.addBeer = function(beerObject, id){
        console.log(beerObject);
        console.log(id);
        $http({
            method:"POST",
            url: '/api/beers',
            data: {
                beerObject: beerObject,
                userId: id
            },
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(
            function(response) {
                controller.beerName = response.config.data.beerObject.name;
                controller.isSelected = false;

            }
        );

        this.selectedBooksBeers.push(beerObject);
        console.log(this.selectedBeers);
    };


//////////////////////////////////////////|
//-----------------EMILY'S CODE-----------|
//////////////////////////////////////////|



  //this is the string that takes what is search in the input on html
  this.searchedBook = "";
  //these are the books you get
  this.foundBooks = [];
  //call this to get id when showing more info
  this.showBookId = "";
  this.selectedBooks = [];

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
      for(i=0; i< 10; i++) {
        // and pushes those found books into an array
        controller.foundBooks.push(response.data.docs[i]);
      }
      //   console.log(response);
    },
    function(response) { //failure
      console.log(response);
    });
  };

  //call this on click to show more information about the books
  this.showBookInfo = function(index){
    this.showBookId = index;
    //return controller.foundBooks[index];
  };

  //call this to add a book to a users collection
  this.addBook = function(bookObject, id){
//set the userId key in the bookObject to the user id before creating the book in our db
    bookObject.userId = id;
    console.log(bookObject);
    $http({
      method: "POST",
      url: "/api/books",
      //the data you are taking to post is the bookobject you selected
      data: bookObject,
        //   userId: id
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response) { //success
      console.log(response);
      controller.hideStuff = true;
      console.log(bookObject);

    },
    function(response) { //failure
      console.log(response);
    });
    //console.log(index);
    //this.selectedBooks.push(index);
    //console.log(this.selectedBooks);
  };

  //this gets us the user id so we can attach it to the book we want to give to the looged in user
  this.getId = function(){
      $http({
          method:"POST",
          url: "/api/userId",
          headers: {
              Authorization: JSON.parse(localStorage.getItem("token"))
          }
      }).then(function(response){//success
              controller.id = response.data.id;
              console.log(response.data.id);
          },
        function(response) {//failure
          console.log(response);
        });
    this.selectedBooksBeers.push(bookObject);

    //console.log(index);
    //this.selectedBooks.push(index);
    //console.log(this.selectedBooks);
  };




}]);
