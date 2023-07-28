'use strict';

app.controller('newCourseCtrl', ['$scope', '$location', 'userService', 'userServiceData', 'schoolService', 'schoolServiceData', 'ICONS', 'languageService',
  function ($scope, $location, userService, userServiceData, schoolService, schoolServiceData, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.course = {};

    vm.userServiceData = userServiceData;
    vm.user = userServiceData.loggedUser;
    vm.users = [];

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    userService.getUsers();

    vm.getUsers = function () {
      vm.users = userServiceData.userList;
      return vm.users;
    }

    vm.getTitle = function () {
      if (vm.user.rol === 'superadmin') {
        return vm.language.SCHOOLS.newCourse;
      } else {
        return vm.language.SCHOOLS.createCourse;
      }
    }

    vm.goToSchools = function() {
      $location.path('schools');
    }

    vm.addCourse = function(){

      if (vm.course.course_name !== '' && vm.course.course_name!== undefined &&
          vm.course.teacher_id !== '' && vm.course.teacher_id !== undefined) {
        let course =  {
          course_name: vm.course.course_name,
          teacher_id: vm.course.teacher_id
        };

        schoolService.addCourse(schoolServiceData.selectedSchool.school_id, course);
      }

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

      vm.userWatcher = $scope.$watch(
        function () {
          return userService.usersLoaded;
        }, function (newValue) {
          if (newValue === true) {
            this.getUsers();
            userService.usersLoaded = false;
          }
        }
      );
    
    }

    initWatchers();

  }]);
