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
    vm.goToNewPost = function(){
      $location.path('posts/new_post');
    }

    vm.deleteRow = function(i){
      vm.posts.splice(i, 1);
    };
    vm.editPost = function(post_id){
      $routeParams.post_id = post_id;
      $location.path('posts/edit_post/' + $routeParams.post_id);
    }



    vm.postServiceData = postServiceData;
    vm.posts = vm.postServiceData.getData();


  }]);
