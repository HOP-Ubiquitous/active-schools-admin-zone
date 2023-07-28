'use strict';

app.controller('medicalCentersCtrl', ['$scope', '$location', 'medicalCenterService', 'medicalCenterServiceData', '$routeParams', 'ICONS', 'userService', 'userServiceData', 'languageService',
    function ($scope, $location, medicalCenterService, medicalCenterServiceData, $routeParams, ICONS, userService, userServiceData, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.user = userServiceData.loggedUser;
    vm.medical_centers = [];

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    medicalCenterService.getMedicalCenters();

    function getMedicalCenters () {
      vm.medical_centers = medicalCenterServiceData.medicalCenterList;
    }


    vm.goToNewMedicalCenter = function(){
      $location.path('medical_centers/new_medical_center');
    };

    vm.goToMedicalCenters = function(){
      $location.path('medical_centers');
    };

    vm.deleteMedicalCenter = function(id){
      medicalCenterService.deleteMedicalCenter(id);
    };

    vm.editMedicalCenter = function(medical_id){
      $routeParams.medical_id = medical_id;
      $location.path('medical_centers/edit_medical_center/' + $routeParams.medical_id);
    };

    vm.asignMedicalCenterToUser = function(medical_id) {
      let userData = {
        rol: 'director',
        username: vm.user.username,
        password: vm.user.password,
        health_data: {
          med_center_id: medical_id
        }
      }

      userService.editUser(vm.user.id, userData, 'loggedUser');
    }

    function initWatchers() {

      vm.languageWatcher = $scope.$watch(
        function () {
          return languageService.languageUpdated;
        }, function (newValue) {
          if (newValue === true) {
            updateLanguage();
            languageService.languageUpdated = false;
          }
        }
      );

      vm.medicalCenterWatcher = $scope.$watch(
        function () {
          return medicalCenterService.medicalCentersLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getMedicalCenters();
            medicalCenterService.medicalCentersLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
