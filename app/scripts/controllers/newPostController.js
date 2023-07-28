'use strict';

app.controller('newPostCtrl', ['$location', '$scope', 'postService', 'postServiceData', 'ICONS', 'languageService',
  function ($location, $scope, postService, postServiceData, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.post = {};

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    vm.getCountry = function (country) {
      vm.post.country = country;
      vm.showOptions = false;
    };

    vm.save = function() {

       let post = {
         date: new Date().toISOString(),
         title: vm.post.title,
         content: vm.post.description,
         image: 'assets/icon/post-bg.svg',
         language: vm.post.country === undefined ? 'ALL' : vm.post.country
       };

      postService.addPost(post);

    };

    vm.goToPosts = function() {
      $location.path('posts');
    };

    function initWatchers() {

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

    }

    initWatchers();

  }]);
