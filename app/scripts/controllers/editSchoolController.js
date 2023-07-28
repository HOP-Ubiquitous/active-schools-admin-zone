'use strict';

app.controller('editSchoolCtrl', ['$scope', '$location', 'schoolService', 'schoolServiceData', '$routeParams', 'ICONS', 'languageService',
  function ($scope, $location, schoolService, schoolServiceData, $routeParams, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.id = $routeParams.school_id;

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    schoolService.getSchoolById(vm.id);

    function getSchool () {
      vm.school = schoolServiceData.schoolById;
    }

    vm.editSchool = function () {

     if ((vm.school.school_name !== undefined && vm.school.school_name !== '') &&
          (vm.school.school_address !== undefined && vm.school.school_address !== '') &&
          (vm.school.school_postal_code !== undefined && vm.school.school_postal_code!== '') &&
          (vm.school.school_city !== undefined && vm.school.school_city !== '') &&
          (vm.school.school_province === vm.school.school_province) &&
          (vm.school.school_country !== undefined && vm.school.school_country !== '')) {

            let school =  {
              director_id: vm.school.director_id,
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
