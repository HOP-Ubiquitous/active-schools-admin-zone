'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('loginCtrl',
  ['$scope',
   '$timeout',
   '$location',
   'userService',
   'userServiceData',
   'schoolService',
   'medicalCenterService',
   'medicalCenterServiceData',
   'ICONS',
   'COUNTRIES',
   function ($scope,
             $timeout,
             $location,
             userService,
             userServiceData,
             schoolService,
             medicalCenterService,
             medicalCenterServiceData,
             ICONS,
             COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.user = {};
    vm.newUser = {};
    vm.school = {};
    vm.medicalCenter = {};
    vm.doctor = {};
    vm.errorMessage = '';
    vm.registerStep1 = false;
    vm.registerStep2 = false;
    vm.registerStep3 = false;
    vm.registerStep4 = false;

    userService.getUsers();

    function getUsers () {
      vm.users = userServiceData.userList;
    }

    vm.login = function(){

      let i = 0;
      
      while (i < vm.users.length) {
        if(vm.users[i].username === vm.user.username && vm.users[i].password === vm.user.password) {
          userService.getUserById(vm.users[i].id, 'login');
          break;
        }

        i++
      }

      // if (userServiceData.loggedUser.username === undefined) {
      //   vm.errorMessage = 'Incorrect User or Password';
      // }

      // vm.openMessageWindow = true;

      // $timeout(function () {vm.openMessageWindow = false;}, 3000);

    };

    vm.checkRegister = function () {
      if ((vm.newUser.email !== undefined && vm.newUser.email !== '') &&
          (vm.newUser.password !== undefined && vm.newUser.password !== '') &&
          (vm.newUser.checkPassword !== undefined && vm.newUser.checkPassword !== '') &&
          (vm.newUser.password === vm.newUser.checkPassword)) {

        vm.registerStep1 = false;
        vm.registerStep2 = true;
        vm.registerStep3 = false;
        vm.registerStep4 = false;

      } else {

        vm.registerStep1 = true;
        vm.registerStep2 = false;
        vm.registerStep3 = false;
        vm.registerStep4 = false;

        vm.errorMessage = 'Required field not filled in or incorrect';

        vm.openMessageWindow = true;
        $timeout(function () {vm.openMessageWindow = false;}, 3000);

      }
    }

    vm.checkUserInfo = function () {

      if ((vm.newUser.email !== undefined && vm.newUser.email !== '') &&
          (vm.newUser.password !== undefined && vm.newUser.password !== '') &&
          (vm.newUser.checkPassword !== undefined && vm.newUser.checkPassword !== '') &&
          (vm.newUser.password === vm.newUser.checkPassword) &&
          (vm.newUser.username !== undefined && vm.newUser.username !== '') &&
          (vm.newUser.surname !== undefined && vm.newUser.surname !== '') &&
          (vm.newUser.sex !== undefined && vm.newUser.sex !== '') &&
          (vm.newUser.weight !== undefined && vm.newUser.weight !== '') &&
          (vm.newUser.height !== undefined && vm.newUser.height !== '') &&
          (vm.newUser.address !== undefined && vm.newUser.address !== '') &&
          (vm.newUser.city !== undefined && vm.newUser.city !== '') &&
          (vm.newUser.province !== undefined && vm.newUser.province !== '') &&
          (vm.newUser.country !== undefined && vm.newUser.country !== '')) {
            
        let director = {
          rol: 'director',
          username: vm.newUser.email,
          password: vm.newUser.password,
          personal_data: {
            name: vm.newUser.username,
            surname: vm.newUser.surname,
            sex: vm.newUser.sex,
            weight: vm.newUser.weight,
            height: vm.newUser.height,
            address: vm.newUser.address,
            city: vm.newUser.city,
            province: vm.newUser.province,
            country: vm.newUser.country
          }
        }

        userService.addUser(director);

        vm.registerStep1 = false;
        vm.registerStep2 = false;
        vm.registerStep3 = true;
        vm.registerStep4 = false;

      } else {

        vm.registerStep1 = false;
        vm.registerStep2 = true;
        vm.registerStep3 = false;
        vm.registerStep4 = false;

        vm.errorMessage = 'Required field not filled in or incorrect';

        vm.openMessageWindow = true;
        $timeout(function () {vm.openMessageWindow = false;}, 3000);

      }

    }

    vm.checkSchoolInfo = function () {
      if ((vm.school.name !== undefined && vm.school.name !== '') &&
          (vm.school.address !== undefined && vm.school.address !== '') &&
          (vm.school.postalCode !== undefined && vm.school.postalCode !== '') &&
          (vm.school.city !== undefined && vm.school.city !== '') &&
          (vm.school.province !== undefined && vm.school.province !== '') &&
          (vm.school.country !== undefined && vm.school.country !== '')) {

        let school = {
          director_id: userServiceData.loggedUser.id,
          school_name: vm.school.name,
          school_address: vm.school.address,
          school_postal_code: vm.school.postalCode,
          school_city: vm.school.city,
          school_province: vm.school.province,
          school_country: vm.school.country
        }

        schoolService.addSchool(school);

        vm.registerStep1 = false;
        vm.registerStep2 = false;
        vm.registerStep3 = false;
        vm.registerStep4 = true;

      } else {

        vm.registerStep1 = false;
        vm.registerStep2 = false;
        vm.registerStep3 = true;
        vm.registerStep4 = false;

        vm.errorMessage = 'Required field not filled in or incorrect';

        vm.openMessageWindow = true;
        $timeout(function () {vm.openMessageWindow = false;}, 3000);

      }
    }

    vm.checkMedicalCenter = function () {
      if ((vm.medicalCenter.name !== undefined && vm.medicalCenter.name !== '') &&
          (vm.medicalCenter.address !== undefined && vm.medicalCenter.address !== '') &&
          (vm.medicalCenter.postalCode !== undefined && vm.medicalCenter.postalCode !== '') &&
          (vm.medicalCenter.city !== undefined && vm.medicalCenter.city !== '') &&
          (vm.medicalCenter.province !== undefined && vm.medicalCenter.province !== '') &&
          (vm.medicalCenter.country !== undefined && vm.medicalCenter.country !== '')) {

        let medicalCenter = {
          medical_center_name: vm.medicalCenter.name,
          medical_center_address: vm.medicalCenter.address,
          medical_center_postal_code: vm.medicalCenter.postalCode,
          medical_center_city: vm.medicalCenter.city,
          medical_center_province: vm.medicalCenter.province,
          medical_center_country: vm.medicalCenter.country
        }

        medicalCenterService.addMedicalCenter(medicalCenter);

        let userInfo = {
          health_data: {
            med_center_id: medicalCenterServiceData.medicalCenterCreated
          }
        }

        userService.editUser(userServiceData.loggedUser.id, userInfo);

      } else {

        vm.registerStep1 = false;
        vm.registerStep2 = false;
        vm.registerStep3 = false;
        vm.registerStep4 = true;

        vm.errorMessage = 'Required field not filled in or incorrect';

        vm.openMessageWindow = true;
        $timeout(function () {vm.openMessageWindow = false;}, 3000);

      }
    }

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

    }

    initWatchers();

  }]);
