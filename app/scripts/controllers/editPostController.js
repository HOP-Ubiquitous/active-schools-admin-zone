'use strict';

app.controller('editPostCtrl', ['$scope', '$location', '$routeParams', 'postService', 'postServiceData', 'ICONS', 'COUNTRIES',
  function ($scope, $location, $routeParams, postService, postServiceData, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.id = $routeParams.post_id

    vm.post = postServiceData.postsList[vm.id];
    // postService.getPostById(vm.id);

    // function getPost () {
    //   vm.post = postServiceData.postById;
    //   vm.post.language = vm.post.language === 'ALL' ? '' : vm.post.language;
    // }

    vm.getCountry = function (country) {
      vm.post.country = country;
    };

    vm.edit = function(){

      let post = {
        date: new Date().toISOString(),
        title: vm.post.title,
        content: vm.post.content,
        image: vm.post.image,
        language: vm.post.country === undefined ? 'ALL' : vm.post.country
      };

      postService.editPost(vm.post.post_id, post);

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
