'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('editPostCtrl', ['$location', function ($location) {

    var vm = this;
    vm.goToPost = function(){
      $location.path('/posts');
    }



  }]);
