'use strict';

app.controller('editSchoolCtrl', ['$scope', '$location', 'schoolService', 'schoolServiceData', '$routeParams', 'ICONS', 'COUNTRIES',
  function ($scope, $location, schoolService, schoolServiceData, $routeParams, ICONS, COUNTRIES) {

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
    vm.id = $routeParams.school_id;

    schoolService.getSchoolById(vm.id);

    function getSchool () {
      vm.school = schoolServiceData.schoolById;
    }

    vm.getUnit = function (unit) {
      vm.school.unit = unit;
    };

    vm.editSchool = function () {

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
            schoolService.editSchool(vm.id, school);

          }else{

          }
  };

  vm.goToSchools = function(){
    $location.path('schools');
  };

    function initWatchers() {

      vm.postWatcher = $scope.$watch(
        function () {
          return schoolService.schoolByIdLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getSchool();
            schoolService.schoolByIdLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
