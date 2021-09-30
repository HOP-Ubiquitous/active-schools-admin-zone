'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('routesCtrl', ['$location', 'routeServiceData', '$routeParams', 'challengeServiceData',  function ($location, routeServiceData, $routeParams, challengeServiceData) {
    var vm = this;

    vm.goToNewRoute = function(){
      $location.path('routes/new_route');
    }
    vm.goToRoute = function(){
      $location.path('routes');
    }
    vm.editChallenge = function(challenge_id){
      $routeParams.challenge_id = challenge_id;
      $location.path('challenges/edit_challenge/' + $routeParams.challenge_id);
    }


    vm.deleteRow = function(){
      console.log();
      debugger;
      vm.routeServiceData.splice(vm.deleteIndex, 1);
    }
    /*
    vm.deleteRow = function(index){
      console.log();
      debugger;
        vm.routeServiceData.deleteRow(index);
    }
*/

    vm.deleteRow_2 = function(i){
debugger;
      if (confirm("¿Quieres borrar la ruta seleccionada?")) {
        vm.challengeServiceData.deleteRow(i);
      }

    }


    vm.editRoute = function(route_id){
      $routeParams.route_id = route_id;
      $location.path('routes/edit_route/' + $routeParams.route_id);
    }

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

    /*
    var clic = 1;
    vm.show = function(){
      debugger;
      if(clic==1){
        document.getElementById("table-2").style.height = "100px";
        clic = clic +1;
      }else{
        document.getElementById("table-2").style.height = "0px";
        clic = 1;
      }
    }*/
//mostrar div popup
    var show_popup = false;
    var popUp = document.getElementById("main");
    vm.deletePopUp = false;


    vm.mostrarPopUp = function(status){
      vm.deletePopUp = ! vm.deletePopUp;
      vm.deleteIndex = status;

    }

    /*vm.borrar = function(id){
      var pop = this.mostrarPopUp(undefined);
      debugger;
      if(pop != undefined && pop){
        vm.routeServiceData.deleteRow(i);
      }
    }*/






    vm.routeServiceData = routeServiceData;
    vm.routes = vm.routeServiceData;
    console.log(vm.routes);

    vm.challengeServiceData = challengeServiceData;
    vm.challenges = vm.challengeServiceData;
    console.log(vm.challenges);
  }]);

