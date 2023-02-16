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
   '$window',
   'userService',
   'userServiceData',
   'schoolService',
   'medicalCenterService',
   'medicalCenterServiceData',
   'ICONS',
   'COUNTRIES',
   'FIREBASE',
   function ($scope,
             $timeout,
             $location,
             $window,
             userService,
             userServiceData,
             schoolService,
             medicalCenterService,
             medicalCenterServiceData,
             ICONS,
             COUNTRIES,
             FIREBASE) {

    var vm = this;

    var firebaseConfig = FIREBASE;

    firebase.initializeApp(firebaseConfig);

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('openid');
    provider.addScope('profile');
    // provider.addScope('https://www.googleapis.com/auth/fitness.activity.read');
    // provider.addScope('https://www.googleapis.com/auth/fitness.activity.write');
    // provider.addScope('https://www.googleapis.com/auth/fitness.blood_glucose.read');
    // provider.addScope('https://www.googleapis.com/auth/fitness.blood_pressure.read');
    // provider.addScope('https://www.googleapis.com/auth/fitness.body.read');
    // provider.addScope('https://www.googleapis.com/auth/fitness.body_temperature.read');
    // provider.addScope('https://www.googleapis.com/auth/fitness.heart_rate.read');
    // provider.addScope('https://www.googleapis.com/auth/fitness.location.read');
    // provider.addScope('https://www.googleapis.com/auth/fitness.location.write');
    // provider.addScope('https://www.googleapis.com/auth/fitness.oxygen_saturation.read');
    // provider.addScope('https://www.googleapis.com/auth/fitness.sleep.read');
    console.log(provider);

    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.sexArray = [
      {
        text: 'Female',
        value: 'female'
      },
      {
        text: 'Male',
        value: 'male'
      }
    ];
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
    vm.showNewMedicalCenterList = true;
    vm.medicalCenterSelected = '';

    userService.getUsers();
    medicalCenterService.getMedicalCenters();

    function getUsers () {
      vm.users = userServiceData.userList;
    }

    function getMedicalCenters () {
      vm.medicalCenters = medicalCenterServiceData.medicalCenterList;
    }

    function getLoggedUser () {
      vm.loggedUser = userServiceData.loggedUser;
    }

    vm.toggleDropdownMedicalCenter = () => {
      vm.showNewMedicalCenterList = !vm.showNewMedicalCenterList;
      return vm.showNewMedicalCenterList;
    }

    vm.login = function(){

      let i = 0;

      while (i < vm.users.length) {
        if(vm.users[i].username === vm.user.username && vm.users[i].password === vm.user.password) {
          userService.getUserById(vm.users[i].id, 'redirect');
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

    vm.signInWithGoogle = () => {

      firebase.auth().signInWithPopup(provider).then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // IdP data available in result.additionalUserInfo.profile.
        console.log(credential);
        vm.newUser = {
          email: result.user.email,
          password: result.user.uid,
          checkPassword: result.user.uid,
        }

      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(credential);

      });

    }

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

        userService.addUser(director, 'addUser');

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
      if (vm.showNewMedicalCenterList === true) {

        let userInfo = {
          rol: 'director',
          username: userServiceData.loggedUser.username,
          password: userServiceData.loggedUser.password,
          health_data: {
            med_center_id: vm.medicalCenterSelected
          }
        }

        userService.editUser(userServiceData.loggedUser.id, userInfo, 'redirect');

      } else {

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
            rol: 'director',
            username: userServiceData.loggedUser.username,
            password: userServiceData.loggedUser.password,
            health_data: {
              med_center_id: medicalCenterServiceData.medicalCenterCreated
            }
          }

          userService.editUser(userServiceData.loggedUser.id, userInfo, 'redirect');

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

      vm.medicalCenterWatcher = $scope.$watch(
        function () {
          return medicalCenterService.medicalCentersLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getMedicalCenters();
            userService.medicalCentersLoaded = false;
          }
        }
      );

      vm.loggedUserWatcher = $scope.$watch(
        function () {
          return userService.userLoadedAfterLogin;
        }, function (newValue) {
          if (newValue === true) {
            getLoggedUser();
            userService.userLoadedAfterLogin = false;
          }
        }
      );

    }

    initWatchers();

  }]);
