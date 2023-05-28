'use strict';

app.controller('newCourseCtrl', ['$scope', '$location', 'userService', 'userServiceData', 'schoolService', 'schoolServiceData', 'ICONS',
  function ($scope, $location, userService, userServiceData, schoolService, schoolServiceData, ICONS) {

    var vm = this;
    vm.icons = ICONS;
    vm.course = {};

    vm.userServiceData = userServiceData;
    vm.user = userServiceData.loggedUser;
    vm.users = [];

    userService.getUsers();

    vm.getUsers = function () {
      vm.users = userServiceData.userList;
      return vm.users;
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
