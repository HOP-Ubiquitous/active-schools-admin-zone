'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('newMedicalCenterCtrl', ['$location', 'medicalCenterService', 'ICONS', 'COUNTRIES',
  function ($location, medicalCenterService, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.categories = [
      {
        name: 'Aerobics',
        value: 'aerobics'
      },
      {
        name: 'Balance',
        value: 'balance'
      },
      {
        name: 'Mental',
        value: 'mental'
      },
      {
        name: 'Strength',
        value: 'strength'
      },
      {
        name: 'Stretch',
        value: 'stretch'
      }
    ];
    vm.units = [
      {
        name: 'Minutes',
        value: 'minutes'
      },
      {
        name: 'Seconds',
        value: 'seconds'
      },
      {
        name: 'Repeats',
        value: 'reps'
      }
    ];
    vm.medical_center = {};

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

  }]);
