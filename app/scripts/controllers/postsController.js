'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('postsCtrl', ['$scope', '$location', 'postService', 'postServiceData', '$routeParams',
    function ($scope, $location, postService, postServiceData, $routeParams) {

    var vm = this;

    postService.getPosts();

    function getPosts () {
      vm.posts = postServiceData.postsList;
    }

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

      function initWatchers() {

        vm.postWatcher = $scope.$watch(
          function () {
            return postService.postsLoaded;
          }, function (newValue) {
            if (newValue === true) {
              getPosts();
              postService.postsLoaded = false;
            }
          }
        );

      }

      initWatchers();

  }]);
