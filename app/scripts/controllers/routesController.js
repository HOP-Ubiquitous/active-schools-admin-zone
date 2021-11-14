'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('routesCtrl', ['$scope', '$location', 'routeService', 'routeServiceData', '$routeParams', 'challengeServiceData',
    function ($scope, $location, routeService, routeServiceData, $routeParams, challengeServiceData) {

    var vm = this;

    vm.routes = [];

    routeService.getRoutes();

    function getRoutes () {
      vm.routes = routeServiceData.routeList;
    }

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

    vm.deleteRow = function(){
      vm.routeServiceData.splice(vm.deleteIndex, 1);
    };

    vm.deleteRow_2 = function(){
      vm.challengeServiceData.splice(vm.deleteIndex, 1);
    };

    vm.editRoute = function(route_id){
      $routeParams.route_id = route_id;
      $location.path('routes/edit_route/' + $routeParams.route_id);
    };

    //Mostrar tabla al pulsar el boton ver

    var show = false;
    var div = document.getElementById("table-2");
    vm.show = function(){

      if(show ^= true){
        div.style.display = "block";
      }else {
        div.style.display = "none";
      }

    }

//mostrar div popup
    var show_popup = false;
    var popUp = document.getElementById("main");
    vm.deletePopUp = false;


    vm.mostrarPopUp = function(status){
      vm.deletePopUp = ! vm.deletePopUp;
      vm.deleteIndex = status;

    }


    vm.mostrarPopUp_2 = function(status){
      vm.delete = ! vm.delete;
      vm.deleteIndex = status;

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

    }

    initWatchers();






    // vm.routeServiceData = routeServiceData;
    // vm.routes = vm.routeServiceData;
    // console.log(vm.routes);

    vm.challengeServiceData = challengeServiceData;
    vm.challenges = vm.challengeServiceData;
    console.log(vm.challenges);
  }]);
