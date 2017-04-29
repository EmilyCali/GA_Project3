var app = angular.module('BBApp', []);

app.controller('MainController', ['$http', function($http){
    var controller = this;


}]);



// *******HTTP EXAMPLES FOR AMANDA TO REFERENCE***********
// this.createUser = function(){
//     console.log(this);
//     $http({
//         method: 'POST',
//         url:'/users',
//         data: {
//             username: this.username,
//             password: this.password
//         }
//     }).then(function(response){
//         controller.getMousses();
//     });
// };
//
// this.deleteMousse = function(id){
//     console.log('deleting Mousse');
//     $http({//copies this from get request
//         method:"DELETE",
//         url:'/mousse/' + id,
//     }).then(function(response){
//         controller.getMousses();
//     });
// };
//
//
// this.showEdit = function(id){
//     this.editableMousseId = id;
// };
//
// this.updateMousse = function(mousse){//was id before hand. we passed mousse._id in the function in the html...and had main.newFlavor etc
//     console.log(mousse);
//     // console.log(id);
//     // var newMousse = {
//     //     flavor: this.newFlavor,
//     //     texture: this.newTexture,
//     //     color: this.newColor,
//     //     goesWithFruit: this.newGoesWithFruit
//     // }
//     $http({//copies this from get request
//         method:"PUT",
//         url:'/mousse/' + mousse._id,//was id
//         data: mousse
//     }).then(function(response){
//         controller.editableMousseId = null;
//         controller.getMousses();
//     });
// };
//
// this.getMousses = function(){
//     console.log(('getting mousses'));
//     $http({
//         method:"GET",
//         url:'/mousse',
//     }).then(function(response){
//         controller.mousses = response.data;
//     });
