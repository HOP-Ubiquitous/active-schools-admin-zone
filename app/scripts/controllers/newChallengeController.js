'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('newChallengeCtrl', ['$location', 'challengeService', 'ICONS', 'COUNTRIES',
  function ($location, challengeService, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.categories = [
      {
        name: 'Aerobics',
        value: 'aerobics'
      },
      {
        name: 'Balance',
        value: 'balance'
      },
      {
        name: 'Mental',
        value: 'mental'
      },
      {
        name: 'Strength',
        value: 'strength'
      },
      {
        name: 'Stretch',
        value: 'stretch'
      }
    ];
    vm.units = [
      {
        name: 'Minutes',
        value: 'minutes'
      },
      {
        name: 'Seconds',
        value: 'seconds'
      },
      {
        name: 'Repeats',
        value: 'reps'
      }
    ];
    vm.challenge = {};

    vm.getUnit = function (unit) {
      vm.challenge.unit = unit;
    };

    vm.save = function(){

      debugger;

      let challenge =  {
        name: vm.challenge.name,
        period: vm.challenge.period,
        unit: vm.challenge.unit,
        bonus: vm.challenge.bonus,
        video: vm.challenge.video,
        images: ['image1', 'image2']
      };

      challengeService.addChallenge(challenge);
    };

  }]);
