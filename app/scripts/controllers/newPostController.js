'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('newPostCtrl', ['$location', 'postServiceData', function ($location, postServiceData) {

    var vm = this;
    let postName = [];
    vm.goToPost = function(){
      $location.path('/posts');
    }

    vm.mostrarPopUp = function(status){
       vm.deletePopUp = ! vm.deletePopUp;
       vm.deleteIndex = status;
     }
     vm.deleteRow = function(){
      vm.postServiceData.splice(vm.deleteIndex, 1);
    }

    vm.save = function(){
      postServiceData.push({
             date: new Date(),
             title:vm.title,
             post:vm.post,
             image:vm.image,
             postPublished: postName.toString()

           });
         }

         vm.savePost = function(id){
          debugger;
          /*
          postName.push({
           posts:vm.posts[id].postPublished
         });
         */
         postName.push(id);
         console.log(postName);

       }




    vm.postServiceData = postServiceData;
    vm.posts = vm.postServiceData;

  }]);
