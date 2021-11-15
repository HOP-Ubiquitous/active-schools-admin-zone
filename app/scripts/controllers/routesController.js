'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('routesCtrl', ['$scope', '$location', 'routeService', 'routeServiceData', '$routeParams',
  function ($scope, $location, routeService, routeServiceData, $routeParams) {

    var vm = this;

    vm.routes = [];
    vm.challengesLoaded = [];

    routeService.getRoutes();

    function getRoutes () {
      vm.routes = routeServiceData.routeList;
    }

    vm.getChallengesByRouteId = function (id) {
      routeService.getChallengesByRouteId(id);
    };

    function getChallengesLoaded () {
      vm.challengesLoaded = routeServiceData.challengesByRoute;
    }

    vm.deleteRoute = function (id) {
      routeService.deleteRoute(id);
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
