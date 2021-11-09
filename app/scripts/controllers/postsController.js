'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('postsCtrl', ['$location', 'postServiceData', '$routeParams', function ($location, postServiceData, $routeParams) {
    var vm = this;
    vm.postServiceData = postServiceData;

    vm.goToPosts = function() {
      $location.path('posts');
    };

    vm.goToNewPost = function() {
      $location.path('posts/new_post');
    };

    vm.deleteRow = function() {
      console.log();
      vm.postServiceData.splice(vm.deleteIndex, 1);
    };

    vm.editPost = function(post_id){
      $routeParams.post_id = post_id;
      $location.path('posts/edit_post/' + $routeParams.post_id);
    }

    vm.mostrarPopUp = function(status){
      vm.deletePopUp = ! vm.deletePopUp;
      vm.deleteIndex = status;

    }


    vm.postServiceData = postServiceData;
    vm.posts = vm.postServiceData;


  }]);
