'use strict';

app.controller('schoolsCtrl', ['$scope', '$location', 'schoolService', 'schoolServiceData', '$routeParams', 'ICONS', 'COUNTRIES', 'userService', 'userServiceData',
    function ($scope, $location, schoolService, schoolServiceData, $routeParams, ICONS, COUNTRIES, userService, userServiceData) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.user = userServiceData.loggedUser;
    vm.userServiceData = userServiceData;
    vm.schools = [];
    vm.selectedSchool = {};
    vm.directorCheck = false;
    vm.courses = [];
    vm.students = [];

    userService.getUsers();
    schoolService.getSchools();

    function getUsers () {
      vm.users = userServiceData.userList;
    }

    function getSchools() {
      vm.schools = schoolServiceData.schoolList;
      let selectedSchool;

      if (vm.user.rol !== 'superadmin') {

        let i = 0;

        while(i < vm.schools.length) { 
          if (vm.schools[i].director_id === vm.user.id) {
            selectedSchool = vm.schools[i];
            vm.directorCheck = true;
            break;
          }
          i++;
        }

        schoolServiceData.selectedSchool = selectedSchool;
        vm.schools = [selectedSchool];

        schoolService.getCoursesBySchool(selectedSchool.school_id);
      }
    }

    function getCourses() {
      vm.courses = schoolServiceData.coursesBySchool;

      vm.courses.forEach((course) => {
        schoolService.getStudentsByCourse(schoolServiceData.selectedSchool.school_id, course.course_id);
      })
    }

    function getStudents() {
      vm.students = vm.students.push(schoolServiceData.studentsByCourse);
    }

    vm.getUserName = function(id) {
      let i = 0;

      if (vm.users !== undefined && vm.users.length > 0) {
        while (i < vm.users.length) {
          if (id === vm.users[i].id) {
            return vm.users[i].personal_data.name + ' ' + vm.users[i].personal_data.surname;
          }
          i++;
        }
      }

    }

    vm.goToNewSchool = function(){
      $location.path('schools/new_school');
    };

    vm.goToSchools = function(){
      $location.path('schools');
    };

    vm.deleteSchool = function(id){
      schoolService.deleteSchool(id);
    };

    vm.editSchool = function(school_id){
      $routeParams.school_id = school_id;
      $location.path('schools/edit_school/' + $routeParams.school_id);
    };

    vm.goToNewCourse = () => {
      $location.path('schools/new_course');
    }

    vm.editSchool = function(course_id){
      $routeParams.course_id = course_id;
      $location.path('schools/edit_course/' + $routeParams.course_id);
    };

    vm.deleteSchool = function(id){
      schoolService.deleteCourse(id);
    };

    function initWatchers() {

      vm.userWatcher = $scope.$watch(
        function () {
          return userService.usersLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getUsers();
            userService.usersLoaded = false;
          }
        }
      );

      vm.schoolsWatcher = $scope.$watch(
        function () {
          return schoolService.schoolsLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getSchools();
            schoolService.schoolsLoaded = false;
          }
        }
      );

      vm.schoolByIdWatcher = $scope.$watch(
        function () {
          return schoolService.schoolByIdLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getSchoolById();
            schoolService.schoolByIdLoaded = false;
          }
        }
      );

      vm.coursesWatcher = $scope.$watch(
        function () {
          return schoolService.coursesLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getCourses();
            schoolService.coursesLoaded = false;
          }
        }
      );

      vm.studendsWatcher = $scope.$watch(
        function () {
          return schoolService.studentsLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getStudents();
            schoolService.studentsLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
