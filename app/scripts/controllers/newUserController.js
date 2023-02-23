'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('newUserCtrl', ['$scope', '$location', 'userService', 'userServiceData', 'ICONS', 'COUNTRIES',
  function ($scope, $location, userService, userServiceData, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;

    vm.addUser = function () {

      if ((vm.user.rol !== undefined && vm.user.rol !== '') &&
          (vm.user.username !== undefined && vm.user.username !== '') &&
          (vm.user.password !== undefined && vm.user.password !== '') &&
          (vm.user.checkPassword !== undefined && vm.user.checkPassword !== '') &&
          (vm.user.password === vm.user.checkPassword) &&
          (vm.user.personal_data.name !== undefined && vm.user.personal_data.name !== '') &&
          (vm.user.personal_data.surname !== undefined && vm.user.personal_data.surname !== '') &&
          (vm.user.personal_data.sex !== undefined && vm.user.personal_data.sex !== '') &&
          (vm.user.personal_data.weight !== undefined && vm.user.personal_data.weight !== '') &&
          (vm.user.personal_data.height !== undefined && vm.user.personal_data.height !== '') &&
          (vm.user.personal_data.address !== undefined && vm.user.personal_data.address !== '') &&
          (vm.user.personal_data.city !== undefined && vm.user.personal_data.city !== '') &&
          (vm.user.personal_data.province !== undefined && vm.user.personal_data.province !== '') &&
          (vm.user.personal_data.country !== undefined && vm.user.personal_data.country !== '')) {

            let user = {
              rol: vm.user.rol,
              username: vm.user.username,
              password: vm.user.password,
              personal_data: {
                name: vm.user.personal_data.name,
                surname: vm.user.personal_data.surname,
                sex: vm.user.personal_data.sex,
                weight: vm.user.personal_data.weight,
                height: vm.user.personal_data.height,
                address: vm.user.personal_data.address,
                city: vm.user.personal_data.city,
                province: vm.user.personal_data.province,
                country: vm.user.personal_data.country
              }
            }
            
            userService.addUser(user, 'newUser');

          } else {

          }

    };

    vm.goToUsers = function(){
      $location.path('users');
    };

  }]);
