'use strict';

app.controller('newPostCtrl', ['$location', 'postService', 'postServiceData', 'ICONS', 'COUNTRIES',
  function ($location, postService, postServiceData, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.post = {};

    vm.getCountry = function (country) {
      debugger;
      vm.post.country = country;
      vm.showOptions = false;
    };

    vm.save = function() {

       let post = {
         date: new Date().toISOString(),
         title: vm.post.title,
         content: vm.post.description,
         image: vm.post.image,
         language: vm.post.country === undefined ? 'ALL' : vm.post.country
       };

      postService.addPost(post);

    };

    vm.goToPosts = function() {
      $location.path('posts');
    };

  }]);
