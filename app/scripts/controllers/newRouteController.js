'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('newRouteCtrl', ['$location', '$window', 'routeServiceData', 'challengeServiceData',
    function ($location, $window, routeServiceData,challengeServiceData) {

    var vm = this;
    let challengeName = [];
    let selectedChallenge = [];
    vm.geoJSON = '';

    var routeMap = $window.L.map('routeMap').setView([50.27264, 7.26469], 13);
    console.log(routeMap);

    $window.L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png').addTo(routeMap);

    $window.L.Icon.extend({
       options: {
         shadowUrl: 'leaf-shadow.png'
       }
    });

    var control = $window.L.Routing.control({
      waypoints: [
        $window.L.latLng(38.7436056, -9.2304153),
        $window.L.latLng(38.5334477, -0.1312811)
      ]
    }).addTo(routeMap);

    function getRoutDetails(instr,coord) {
      var formatter = new $window.L.Routing.Formatter();
      var instrPts = {
        type: "FeatureCollection",
        features: []
      };
      for (var i = 0; i < instr.length; ++i) {
        var g = {
          "type": "Point",
          "coordinates": [coord[instr[i].index].lng, coord[instr[i].index].lat]
        };
        var p = {
          "instruction": formatter.formatInstruction(instr[i])
        };
        instrPts.features.push({
          "geometry": g,
          "type": "Feature",
          "properties": p
        });
      }
      vm.geoJSON = instrPts;
      return instrPts;
    }

    control.on('routeselected', function (e) {
      var coord = e.route.coordinates;
      var instr = e.route.instructions;
      $window.L.geoJson(getRoutDetails(instr,coord)).addTo(routeMap);
    });

    vm.save = function(){

      var instructions = vm.geoJSON;
      console.log(instructions);

      routeServiceData.push({
        date: new Date(),
        name:vm.name,
        city:vm.city,
        province:vm.province,
        country:vm.country,
        challenges: selectedChallenge.toString()
      });

   };



   vm.saveChallenge = function(name){

     /*challengeName.push({
      challenges:vm.challenges[id].name
    });*/
    selectedChallenge.push(name);


  }

  vm.mostrarPopUp = function(status){
   // debugger;
    vm.deletePopUp = ! vm.deletePopUp;
    vm.deleteIndex = status;

  }

    vm.challengeServiceData = challengeServiceData;
    vm.challenges = vm.challengeServiceData;

    vm.routeServiceData = routeServiceData;
    vm.routes = vm.routeServiceData;

  }]);
