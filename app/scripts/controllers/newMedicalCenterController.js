'use strict';

app.controller('newMedicalCenterCtrl', ['$location', 'medicalCenterService', 'ICONS', 'languageService',
  function ($location, medicalCenterService, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.medical_center = {};

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    vm.getUnit = function (unit) {
      vm.medical_center.unit = unit;
    };

    vm.addMedicalCenter = function(){

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

            medicalCenterService.addMedicalCenter(medical_center, 'new_medical_center');

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

    }

    initWatchers();

  }]);
