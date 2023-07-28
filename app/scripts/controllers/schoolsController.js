'use strict';

app.controller('schoolsCtrl', ['$scope', '$location', 'schoolService', 'schoolServiceData', '$routeParams', 'ICONS', 'userService', 'userServiceData', 'languageService',
    function ($scope, $location, schoolService, schoolServiceData, $routeParams, ICONS, userService, userServiceData, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.user = userServiceData.loggedUser;
    vm.userServiceData = userServiceData;
    vm.schools = [];
    vm.selectedSchool = {};
    vm.directorCheck = false;
    vm.courses = [];
    vm.students = [];

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    userService.getUsers();
    schoolService.getSchools();

    function getUsers () {
      vm.users = userServiceData.userList;
    }

    vm.getTitle = function () {
      if (vm.user.rol === 'superadmin') {
        return vm.language.HOME.schools;
      } else {
        return vm.language.SCHOOLS.yourSchool;
      }
    }

    vm.getTitleData = function () {
      if (vm.user.rol === 'superadmin') {
        return vm.language.SCHOOLS.schoolList;
      } else {
        return vm.language.SCHOOLS.schoolData;
      }
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

    vm.getCoursesBySchoolIndex = function (index) {

      let selectedCourses = vm.schools[index].courses_data;

      selectedCourses.forEach((course) => {
        course.teacher_name = vm.getUserName(course.teacher_id);
      })

      vm.selectedSchoolCourses = selectedCourses;

    }

    vm.toggleCourses = (selectedIndex) => {

      vm.schools.forEach((school, index) => {
        if (index === selectedIndex) {
          school.showCourses = true;
        } else {
          school.showCourses = false;
        }
      })

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

    vm.editCourse = function(course_id){
      $routeParams.course_id = course_id;
      $location.path('schools/edit_course/' + $routeParams.course_id);
    };

    vm.deleteCourse = function(id){
      schoolService.deleteCourse(id);
    };

    function initWatchers() {

      vm.languageWatcher = $scope.$watch(
        function () {
          return languageService.languageUpdated;
        }, function (newValue) {
          if (newValue === true) {
            updateLanguage();
            languageService.languageUpdated = false;
          }
        }
      );

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

    }

    initWatchers();

  }]);
