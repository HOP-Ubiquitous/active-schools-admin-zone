'use strict';

app.controller('editPostCtrl', ['$scope', '$location', '$routeParams', 'postService', 'postServiceData', 'ICONS', 'COUNTRIES',
  function ($scope, $location, $routeParams, postService, postServiceData, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.id = $routeParams.post_id

    postService.getPostById(vm.id);

    function getPost () {
      vm.post = postServiceData.postById;
    }

    vm.getCountry = function (country) {
      vm.post.country = country;
    };

    vm.edit = function(){

      let language;

      if (vm.post.country === 'All' || vm.post.country === 'England') {
        language = 0;
      } else if (vm.post.country === 'Greece') {
        language = 1;
      } else if (vm.post.country === 'Spain') {
        language = 2;
      }

      let post = {
        date: new Date().toISOString(),
        title: vm.post.title,
        description: vm.post.description,
        image: vm.post.image,
        country: vm.post.country,
        language: language
      };

      postService.editPost(vm.id, post);

    };

    vm.goToPosts = function() {
      $location.path('posts');
    };

    function initWatchers() {

      vm.postWatcher = $scope.$watch(
        function () {
          return postService.postByIdLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getPost();
            postService.postByIdLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
