'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('schoolsCtrl', ['$scope', '$location', 'schoolService', 'schoolServiceData', '$routeParams', 'ICONS', 'COUNTRIES', 'userService', 'userServiceData',
    function ($scope, $location, schoolService, schoolServiceData, $routeParams, ICONS, COUNTRIES, userService, userServiceData) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.user = userServiceData.loggedUser;
    vm.schools = [];

    schoolService.getSchools();

    function getSchools() {
      vm.schools = schoolServiceData.schoolList;
    }


    vm.goToNewSchool = function(){
      $location.path('schools/new_school');
    };

    vm.goToSchools = function(){
      $location.path('schools');
    };

    vm.deleteSchool = function(id){
      schoolService.deleteSchool(id);
    };

    vm.editSchool = function(school_id){
      $routeParams.school_id = school_id;
      $location.path('schools/edit_school/' + $routeParams.school_id);
    };

    function initWatchers() {

      vm.schoolsWatcher = $scope.$watch(
        function () {
          return schoolService.schoolsLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getSchools();
            schoolService.schoolsLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
