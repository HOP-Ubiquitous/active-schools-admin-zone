'use strict';

app.controller('editMedicalCenterCtrl', ['$scope', '$location', 'medicalCenterService', 'medicalCenterServiceData', '$routeParams', 'ICONS', 'languageService',
  function ($scope, $location, medicalCenterService, medicalCenterServiceData, $routeParams, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.id = $routeParams.medical_center_id;

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    medicalCenterService.getMedicalCenterById(vm.id);

    function getMedicalCenter () {
      vm.medical_center = medicalCenterServiceData.medicalCenterById;
    }

    vm.getUnit = function (unit) {
      vm.medical_center.unit = unit;
    };

    vm.editMedicalCenter = function () {

      if ((vm.medical_center.medical_center_name !== undefined && vm.medical_center.medical_center_name !== '') &&
          (vm.medical_center.medical_center_address !== undefined && vm.medical_center.medical_center_address !== '') &&
          (vm.medical_center.medical_center_postal_code !== undefined && vm.medical_center.medical_center_postal_code!== '') &&
          (vm.medical_center.medical_center_city !== undefined && vm.medical_center.medical_center_city !== '') &&
          (vm.medical_center.medical_center_province === vm.medical_center.medical_center_province) &&
          (vm.medical_center.medical_center_country !== undefined && vm.medical_center.medical_center_country !== '')) {

            let medical_center =  {
              medical_center_name: vm.medical_center.medical_center_name,
              medical_center_address: vm.medical_center.medical_center_address,
              medical_center_postal_code: vm.medical_center.medical_center_postal_code,
              medical_center_city: vm.medical_center.medical_center_city,
              medical_center_province: vm.medical_center.medical_center_province,
              medical_center_country: vm.medical_center.medical_center_country
            }

            medicalCenterService.editMedicalCenter(vm.id, medical_center);

          }else{

          }
  };

  vm.goToMedicalCenters = function(){
    $location.path('medical_centers');
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

      vm.postWatcher = $scope.$watch(
        function () {
          return medicalCenterService.medicalCenterByIdLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getMedicalCenter();
            medicalCenterService.medicalCenterByIdLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
