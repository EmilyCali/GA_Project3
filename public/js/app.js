var app = angular.module('BBApp', []);

//////////////////////////////////////////|
//----------------MAIN CONTROLLER---------|
//////////////////////////////////////////|
app.controller('MainController', ['$scope', '$http', function($scope, $http){
    var controller    = this;
    this.url          = 'http://locallhost:3000/';
    this.user         = {};//empty object for user
    /////////////////////////////////
    //for showing and hiding sections
    /////////////////////////////////
    this.token           = false;
    this.showAccount     = false;
    this.isSelected      = true;
    this.hideStuff       = false;
    this.showAllTheLikes = false;
    this.showUsers       = false;
    /////////////////////////////////
    //empty VARIABLES
    /////////////////////////////////
    //the show beer id
    this.showBeerId   = '';
    //the empty string for the searched input
    this.searching    = '';
    //empty array that the beer results from the search go into
    this.beers        = [];
    this.selectedBooksBeers = [];
    //this is the string that takes what is search in the input on html
    this.searchedBook = "";
    //these are the books you get
    this.foundBooks = [];
    //call this to get id when showing more info
    this.showBookId = "";
    this.selectedBooks = [];


    //****************************************|
    //----------------signUp------------------|
    //****************************************|
    this.signUp = function(userInfo){
        $http({
            method:'POST',
            url: "/api/signup",
            data: {
              //this data is set to be keys in the user model
                    username: userInfo.newUsername,
                    password: userInfo.newPassword
            }
        }).then(function(response){//success
          //the username is the data from the page username
            controller.username = response.data.user.username;
            //set the token to the user
            localStorage.setItem('token', JSON.stringify(response.data.token));
            //post request to authenticate newly registered user
            $http({
                method:'POST',
                url: "/api/authenticate",
                data: {
                        username: response.data.username,
                        password: response.data.password
                }
            }).then(function(response){//success
              //toggle that the user does have a token
                controller.token = true;
                $scope.token = controller.token;
            });
        }.bind(this));
    };
    //****************************************|
    //----------------login-------------------|
    //****************************************|
    this.login = function(userInfo){
        $http({
            method:'POST',
            url: "/api/authenticate",
            data: {
                    username: userInfo.username,
                    password: userInfo.password
            }
        }).then(function(response){//success
          //set the controller stuff to the data response
            controller.id = response.data.id,
            controller.username = response.data.username;
            //toggle the token
            controller.token = true;
            $scope.token = controller.token;
            //if there is not a success
            if(!response.data.success){
              //toggle the token to false
                controller.token = false;
                $scope.token = controller.token;
                controller.message = response.data.message;
            }
            localStorage.setItem('token', JSON.stringify(response.data.token));
        }.bind(this));
    };
    //****************************************|
    //----------------getUsers----------------|
    //this gets all the users and makes them--|
    //---------------available----------------|
    //****************************************|
    this.getUsers = function(){
        $http({
            url: '/api/users',
            method: 'GET',
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){//success
          //unauthorized so user can't go anywhere
            if (response.data.status == 401) {
                this.error = "Unauthorized";
            } else {
              //otherwise user can see the other users
                controller.users = response.data;
            }
        }.bind(this));
    };
    //****************************************|
    //-----------showMyAccount----------------|
    //****************************************|
    this.showMyAccount = function(id){
        this.showAccount = true;
        this.showUsers = true;
        $http({
            url: '/api/' + id,
            method: 'GET',
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){//success
            //can't let user in
            if (response.data.status == 401) {
                this.error = "Unauthorized";
            } else {
              //user can see thier own account info
                controller.user = response.data;
            }
        }.bind(this));
    };
    //****************************************|
    //----------------showEdit----------------|
    //****************************************|
    //this is called to get the edit form to show
    this.showEdit = function(){
     //check that this is clicked by logging that the user clicked
        //toggle show the edit part of the html
        this.showEditForm = true;
        //toggle to hide the account
        this.showAccount = false;
    };
    //****************************************|
    //----------------update------------------|
    //****************************************|
    this.update = function(user, id){
        $http({
            method:"PUT",
            url: '/api/' + id,
            data: user,
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){//success
          //toggles
            controller.editableUserId = null;
            this.showEditForm = false;
            this.showAccount = true;
            controller.editableUserId = null;
            this.showMyAccount(response.data._id);
        }.bind(this));
    };
    //****************************************|
    //----------------logout------------------|
    //****************************************|
    this.logout = function(){
      //removes the token
        localStorage.clear('token');
        //reloads the page which sends user back to login register page
        location.reload();
    };
    //****************************************|
    //--------------deleteAccount-------------|
    //****************************************|
    this.deleteAccount = function(id){
        console.log('delete clicked');
        $http({
            method: 'DELETE',
            url:'/api/delete/' + id,
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){
            console.log(response + "delete");
            controller.getPairs();
        });
    };

//time to make a pair of beer and books
//pass in the name of the beer and the name of the book (book title)
    this.pair = function(beerName, bookName){
        $http({
            method:'PUT',
            url: '/api/pair',
            data: { //immitate the object to be made
                pair: {
                    beer: beerName,
                    book: bookName,
                }
            },
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){//success
            //toggle to let user see the other users pairings
            controller.showAllTheLikes = true;
            //toggle
            controller.showUsers = false;
            //get the pairs
            controller.getPairs();
        });
    };

//get one user, the one that is logged in
    this.getUser = function(){
        $http({
            method:'GET',
            url:'/api/getUser',
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){//success

        });
    };

//get the pairs from the pairs collection
    this.getPairs = function(){
        $http({
            method:'GET',
            url:'/api/pairs',
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(response){
        });
    };

    //add the pair to the pairs collection so there is an archive
    this.addPair = function(beerName, bookName, id){
        $http({
            method:"POST",
            url: '/api/pairs',
            data: {
                pair: {
                    beer: beerName,
                    book: bookName,
                }
            },
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(
            function(response) {
                controller.getUsers();
            }
        );
    };

//go back to the search area without logging out
    this.returnToSearch = function(){
      //toggle things for hide and show
        this.showAccount = false;
        this.hideStuff = false;
        this.showAllTheLikes = false;
        this.showUsers = true;
        this.isSelected = true;
        this.getUsers();
        this.beers = [];
        //empty the selected array to make sure it only every give you new values
        this.selectedBooksBeers = [];
        this.searching = '';
        this.searchedBook = "";
        this.foundBooks = [];
    };

//find the beers from the api (brewerydb)
    this.find = function(){
        $http({
                method:'GET',
                url: 'https://api.brewerydb.com/v2/search?q=' + this.searching + '&type=beer&key=3553963f6fa0d83f188f21fcc4ac9343&format=json'
            }).then(
            function(response) { //success callback
              //set the empty array for results to go in from the api call
                controller.beers = [];
                //loop through the results to have the ng-repeat work in the html
                for(i=0; i< 10;
                  //response.data.data.length;
                  i++)
                {
                // controller.arr.push(response.data.data[i].name);
                //push the result beers into the emptry beer array
                    controller.beers.push(response.data.data[i]);
                }
            },
            function(error){ //fail callback
                console.log('fail');
                console.log(error);
            }
        );
    };

    //click function to have more information show when you click the beer name
    this.showInfo = function(index){
        // console.log(index);
        this.showBeerId = index;
      };
    //add a beer to the beers collection and the user
    this.addBeer = function(beerObject, id){
        $http({
            method:"POST",
            url: '/api/beers',
            data: {
                beerObject: beerObject,
                //give it the user id so it can be matched
                userId: id
            },
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then(
            function(response) {
                controller.beerName = response.config.data.beerObject.name;
                console.log(controller.beerName);
                controller.isSelected = false;
                // console.log(controller.isSelected);
            }
        );
        //put this beer into the selected array, temporarily
        this.selectedBooksBeers.push(beerObject);
        //console.log(this.selectedBooksBeers);
    };

  //function to get the books when a query happens
  this.findBook = function() {
    $http({
      method: "GET",
      //use the open library search api
      url: "https://openlibrary.org/search.json?q=" + this.searchedBook
      //may or may not need to specify data
      //data: this
    }).then(function(response) {//success
      controller.foundBooks = [];
      // this limits the results to ten
      for(i = 0; i < 10; i++) {
        // and pushes those found books into an array
        controller.foundBooks.push(response.data.docs[i]);
      }
      //   console.log(response);
    },
    function(response) { //failure
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
    //console.log(bookObject);
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
      controller.hideStuff = true;
    },
    function(response) { //failure
      console.log(response);
    });
    //push the book into the temporary selected array so it can be accessed in the pairing functions
    this.selectedBooksBeers.push(bookObject);
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
        //this also might be a set to the userid so we probably can get rid of one or the other
              controller.id = response.data.id;
          },
        function(response) {//failure
          console.log(response);
        });
  };
  //****************************************|
  //****************************************|
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  //------------------fin-------------------|
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  //****************************************|
  //****************************************|

}]);
