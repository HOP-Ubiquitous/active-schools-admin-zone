'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('homeCtrl', ['$scope', '$location', 'medicalCenterService', '$routeParams', 'ICONS', 'COUNTRIES', 'userService', 'userServiceData',
    function ($scope, $location, $routeParams, ICONS, COUNTRIES, userService, userServiceData) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.user = userServiceData.loggedUser;
    vm.home = [];

    vm.goToRoutes = function(){
      $location.path('routes');
    };

    vm.goToChallenges = function(){
      $location.path('challenges');
    };

    vm.goToSchools = function(){
      $location.path('schools');
    };

    vm.goToMedicalCenters = function(){
      $location.path('medical_centers');
    };

    vm.goToPosts = function(){
      $location.path('posts');
    };

    vm.goToUsers = function(){
      $location.path('users');
    };

    vm.goToTeams = function(){
      $location.path('teams');
    };

  }]);
