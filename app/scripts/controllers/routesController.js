'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('routesCtrl', ['$scope', '$location', 'routeService', 'routeServiceData', 'challengeService', 'challengeServiceData', '$routeParams', 'ICONS', 'COUNTRIES',
  function ($scope, $location, routeService, routeServiceData, challengeService, challengeServiceData, $routeParams, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;

    vm.routes = [];
    vm.challengesLoaded = [];
    vm.uniqueChallengesIds = [];

    routeService.getRoutes();

    function getRoutes () {
      vm.routes = routeServiceData.routeList;
    }

    vm.getChallengesByRouteId = function (index) {

      challengeServiceData.challengeListByRoute = [];
      let selectedChallengesIds = [];
      let selectedChallenges = vm.routes[index].challenges; //Obtiene los retos de la ruta seleccionada
      console.log(selectedChallenges);

      selectedChallenges.forEach(function(challenge) {
        Object.keys(challenge).forEach(function(key) { //ForEach dentro de un objeto (key, value)
          selectedChallengesIds.push(key); //Pushea los ids los retos en un array vacio
        });
        console.log(challenge);
      });

      //Filtra los ids para que en el array solo haya elementos diferentes
      vm.uniqueChallengesIds = selectedChallengesIds.filter((value, index, array) => selectedChallengesIds.indexOf(value) === index);

      challengeService.getChallenges();

    };

    function getChallengesLoaded () {
      //Se trae todos los retos pero los filtra con los ids del vm.uniqueChallengesIds y solo muestra los que coincidan
      vm.challengesLoaded = challengeServiceData.challengeList.filter(challenge => vm.uniqueChallengesIds.includes(challenge.challenge_id));
    }

    vm.deleteRoute = function (route_id) {
      routeService.deleteRoute(route_id);
    };

    vm.goToNewRoute = function() {
      $location.path('routes/new_route');
    };

    vm.goToRoutes = function() {
      $location.path('routes');
    };

    vm.editChallenge = function(challenge_id) {
      $routeParams.challenge_id = challenge_id;
      $location.path('challenges/edit_challenge/' + $routeParams.challenge_id);
    };

    vm.editRoute = function(route_id){
      $routeParams.route_id = route_id;
      $location.path('routes/edit_route/' + $routeParams.route_id);
    };

    function initWatchers() {

      vm.routeWatcher = $scope.$watch(
        function () {
          return routeService.routesLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getRoutes();
            routeService.routesLoaded = false;
          }
        }
      );

      vm.challengesWatcher = $scope.$watch(
        function () {
          return challengeService.challengesLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getChallengesLoaded();
            challengeService.challengesLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
