'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('postsCtrl', ['$location', function ($location) {
    var vm = this;
    vm.goToNewPost = function(){
      $location.path('posts/new_post');
    }

    vm.deleteRow = function(i){
      vm.posts.splice(i, 1);
    };

    vm.posts = [
      { 'id': '01', 'date': '05/06/2021', 'title': 'Ruta 1', 'image': 'image1', 'postPublished': 'All'},
      { 'id': '02', 'date': '06/07/2021','title': 'Ruta 2', 'image': 'image2', 'postPublished': 'Spain'},
      { 'id': '03', 'date': '07/08/2021', 'title': 'Ruta 3', 'image': 'image3', 'postPublished': 'Grece'},
      { 'id': '04', 'date': '08/09/2021','title': 'Ruta 4', 'image': 'image4', 'postPublished': 'Wales'},
      { 'id': '05', 'date': '09/03/2021','title': 'Ruta 5', 'image': 'image5', 'postPublished': 'Italy'}

   ]


  }]);
