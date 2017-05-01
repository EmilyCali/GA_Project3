var app = angular.module("BookDataApp", []);

app.controller("BookController", ["$http", function($http) {
  var controller = this;
  this.getBook = function(searchedBook) {
    $http({
      method: "GET",
      url: "http://openlibrary.org/search.json?q=" + searchedBook
      // data: {
      //
      // }
    }).then(function(response) {//success
      console.log(response);
      controller.foundBooks = response.data;
    },
    function(response) { //failure
      console.log(response);
    });
  };
}]);

//not sure yet how to implement the above going to test with the below jquery-3

//THE BELOW IS FUNCTIONING IN THAT ITS REACHING THE OPEN LIBRARY API BUT NOT PRINTING THE data, ALSO NEED TOMAKE IT PUSH DATA TO THE BOOKS MODEL AND BIND THAT TO THE BEER AND USER












// $(function() {
//
//   // code
//     var $btn = $("#submit-button");
//     var $box = $("#input-box");
//
//
//       var addBook = function(){
//         var $inputValue = $("#input-box").val();
//
//         $.ajax("http://openlibrary.org/search.json?q=" + $inputValue).done(function(stuff) {
//           console.log(stuff);
//           // var $img = $("<img />").attr("src", stuff.cover_i).appendTo("body");
//           // var $title = $("<p />").text(stuff.title).appendTo("body");
//         });
//       };
//
//       $("#submit-button").on("click", addBook);
//
//
//
// }); // end window onload
