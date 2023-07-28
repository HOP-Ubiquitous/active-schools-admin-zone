'use strict';

app.controller('postsCtrl', ['$scope', '$location', 'postService', 'postServiceData', '$routeParams', 'ICONS', 'languageService',
    function ($scope, $location, postService, postServiceData, $routeParams, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    postService.getPosts();

    function getPosts () {
      vm.posts = postServiceData.postsList;
    }

    vm.getCountry = function (country) {
      if (country = 'ALL') {
        return vm.language.POSTS.all;
      } else {
        return vm.language.COUNTRIES[country];
      }
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

    vm.deletePost = function(post_id) {
      postService.deletePost(post_id)
    }

    vm.mostrarPopUp = function(status){
      vm.deletePopUp = ! vm.deletePopUp;
      vm.deleteIndex = status;

    }

      function initWatchers() {

        vm.languageWatcher = $scope.$watch(
          function () {
            return languageService.languageUpdated;
          }, function (newValue) {
            if (newValue === true) {
              updateLanguage();
              languageService.languageUpdated = false;
            }
          }
        );

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
