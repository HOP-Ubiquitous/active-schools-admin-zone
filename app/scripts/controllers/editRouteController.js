'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('editRouteCtrl', ['$location', function ($location) {

    var vm = this;
    vm.goToRoute = function(){
      $location.path('/routes');
    }



  }]);
