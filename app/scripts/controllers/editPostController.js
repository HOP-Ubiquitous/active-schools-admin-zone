'use strict';

app.controller('editPostCtrl', ['$scope', '$location', '$routeParams', 'postService', 'postServiceData', 'ICONS', 'languageService',
  function ($scope, $location, $routeParams, postService, postServiceData, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.id = $routeParams.post_id;

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();
    
    postService.getPostById(vm.id);

    function getPost () {
      vm.post = postServiceData.postById;
      vm.post.language = vm.post.language === 'ALL' ? '' : vm.post.language;
    }

    vm.getCountry = function (country) {
      vm.post.country = country;
    };

    vm.edit = function () {

      let post = {
        date: new Date().toISOString(),
        title: vm.post.title,
        content: vm.post.content,
        image: 'assets/icon/post-bg.svg',
        language: vm.post.country === undefined ? 'ALL' : vm.post.country
      };

      postService.editPost(vm.post.post_id, post); //TODO error 500, server

    };

    vm.goToPosts = function () {
      $location.path('posts');
    };

    function initWatchers () {

      vm.languageWatcher = $scope.$watch(
        function () {
          return languageService.formLanguageUpdated;
        }, function (newValue) {
          if (newValue === true) {
            updateLanguage();
            languageService.formLanguageUpdated = false;
          }
        }
      );

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
