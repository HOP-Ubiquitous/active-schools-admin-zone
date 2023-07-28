'use strict';

app.controller('editCourseCtrl', ['$scope', '$location', 'schoolService', 'schoolServiceData', 'userService', 'userServiceData', '$routeParams', 'ICONS', 'languageService',
  function ($scope, $location, schoolService, schoolServiceData, userService, userServiceData, $routeParams, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.id = $routeParams.course_id;

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

    schoolService.getCourseById(vm.id);

    function getCourse () {
      vm.course = schoolServiceData.courseById;
    }

    vm.edit = function () {

      let course =  {
        course_name: vm.course.course_name,
        teacher_id: vm.course.teacher_id
      };

      schoolService.editCourse(vm.id, course);

    };

    vm.goToSchools = function () {
      $location.path('schools');
    }

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
          return schoolService.courseByIdLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getCourse();
            schoolService.courseByIdLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
