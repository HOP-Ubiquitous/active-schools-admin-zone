'use strict';

app.controller('newSchoolCtrl', ['$location', 'schoolService', 'userServiceData', 'ICONS', 'languageService',
  function ($location, schoolService, userServiceData, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.user = userServiceData.loggedUser;
    
    vm.school = {};

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    if (vm.user.rol !== 'superadmin') {
      vm.school.director_id = vm.user.id;
    }

    vm.getTitle = function () {
      if (vm.user.rol === 'superadmin') {
        return vm.language.SCHOOLS.newSchool;
      } else {
        return vm.language.SCHOOLS.createSchool;
      }
    }

    vm.addSchool = function(){

      if ((vm.school.director_id !== undefined && vm.school.director_id !== '') &&
          (vm.school.school_name !== undefined && vm.school.school_name !== '') &&
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

        if (vm.user.rol !== 'superadmin') {
          schoolService.addSchool(school, 'single');
        } else {
          schoolService.addSchool(school, 'all');
        }

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

    }

    initWatchers();

  }]);
