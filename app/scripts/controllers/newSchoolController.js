'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('newSchoolCtrl', ['$location', 'schoolService', 'ICONS', 'COUNTRIES',
  function ($location, schoolService, ICONS, COUNTRIES) {

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
    vm.school = {};

    vm.getUnit = function (unit) {
      vm.school.unit = unit;
    };

    //Habrá que implementar el que guarde el id del director que lo cree como una variable
    vm.addSchool = function(){

      if ((vm.school.school_name !== undefined && vm.school.school_name !== '') &&
          (vm.school.school_address !== undefined && vm.school.school_address !== '') &&
          (vm.school.school_postal_code !== undefined && vm.school.school_postal_code!== '') &&
          (vm.school.school_city !== undefined && vm.school.school_city !== '') &&
          (vm.school.school_province === vm.school.school_province) &&
          (vm.school.school_country !== undefined && vm.school.school_country !== '')) {

            let school =  {
              school_name: vm.school.school_name,
              school_address: vm.school.school_address,
              school_postal_code: vm.school.school_postal_code,
              school_city: vm.school.school_city,
              school_province: vm.school.school_province,
              school_country: vm.school.school_country
            }

            schoolService.addSchool(school, 'new_school');

          }else{

          }

    };

  }]);
