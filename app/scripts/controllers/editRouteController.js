'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('editRouteCtrl', ['$location', 'routeServiceData', 'challengeServiceData', function ($location, routeServiceData, challengeServiceData) {

    var vm = this;
    vm.goToRoute = function(){
      $location.path('/routes');
    }

    /*vm.save = function(){
      debugger;
      routeServiceData.addRow({
             date: new Date(),
             name:vm.name,
             city:vm.city,
             province:vm.province,
             country:vm.country,

           });
         }

*/
         vm.editRoutes = function(){
          debugger;
          this.editRoute();
          routeServiceData.editRoute({
                  id: 3,
                 date: new Date(),
                 name:vm.name,
                 city:vm.city,
                 province:vm.province,
                 country:vm.country,
                 challenges: vm.challenge
               });
             }

             vm.editRoute = function(row){
              debugger;

              for(var i=0; i<routeServiceData.length; i++){

                if(row.id === parseInt(routeServiceData[i].id)){
                  routeServiceData.splice(i,1);

                break;
                  }

                }
                routeServiceData.push(row);


            }

             vm.challengeServiceData = challengeServiceData;
             vm.challenges = vm.challengeServiceData;
             console.log(vm.challenges);

  }]);
