'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('routesCtrl', ['$scope', '$location', 'routeService', 'routeServiceData', '$routeParams', 'ICONS', 'COUNTRIES',
  function ($scope, $location, routeService, routeServiceData, $routeParams, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;

    vm.routes = [];
    vm.challengesLoaded = [];

    routeService.getRoutes();

    function getRoutes () {
      vm.routes = routeServiceData.routeList;
    }

    vm.getChallengesByRouteId = function (route_id) {
      routeService.getChallengesByRouteId(route_id);
    };

    function getChallengesLoaded () {
      vm.challengesLoaded = routeServiceData.challengesByRoute;
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
          return routeService.routeChallengesLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getChallengesLoaded();
            routeService.routeChallengesLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
