'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

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

       postService.addPost(post);

    };

  }]);
