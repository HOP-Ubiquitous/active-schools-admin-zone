'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('newRouteCtrl', ['$scope', '$location', '$window', '$routeParams', 'routeService', 'challengeService', 'challengeServiceData',
  function ($scope, $location, $window, $routeParams, routeService, challengeService, challengeServiceData) {

    var vm = this;

    challengeService.getChallenges();

    function getChallenges () {
      vm.challenges = challengeServiceData.challengeList;

      vm.challenges.forEach(function (challenge) {
        challenge.show = true;
      });

    }

    vm.route = {};
    vm.geoJSON = '';
    vm.selectedChallenges = [];

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

        //Barcelona
        $window.L.latLng(41.37539, 2.14944),
        $window.L.latLng(41.41363, 2.15345)

        //Livadeia
        // $window.L.latLng(38.44219, 22.86522),
        // $window.L.latLng(38.4379, 22.89162)

        //Madrid
        // $window.L.latLng(40.41402, -3.72096),
        // $window.L.latLng(40.41524, -3.68885)

        //Ceutí
        // $window.L.latLng(38.08179, -1.28304),
        // $window.L.latLng(38.08107, -1.26396)

      ]
    }).addTo(routeMap);

    function getInstruction (i) {
      if (i === 0) {
        return 'Start';
      } else if (i === vm.waypoints.length - 1) {
        return 'End';
      } else {
        return 'Challenge';
      }
    }

    function getRouteDetails(waypoints) {

      var instrPts = {
        type: "FeatureCollection",
        features: []
      };

      for (var i = 0; i < waypoints.length; ++i) {
        var g = {
          "type": "Point",
          "coordinates": [waypoints[i].latLng.lat, waypoints[i].latLng.lng]
        };

        var p = {
          "instruction": getInstruction(i)
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
      vm.waypoints = e.route.waypoints;
      console.log(vm.waypoints);
      $window.L.geoJson(getRouteDetails(vm.waypoints)).addTo(routeMap);
    });

    vm.addChallenge = function (id) {
      vm.challenges.forEach(function (challenge) {
        if (challenge.id === id) {
          let challengeObject = {
            id : id,
            name: challenge.name
          };
          challenge.show = false;
          vm.selectedChallenges.push(challengeObject);
        }
      });
    };

    vm.deleteChallenge = function (id) {
      vm.selectedChallenges.forEach(function (challenge, index) {
        if (challenge.id === id) {
          vm.selectedChallenges.splice(index, 1);
        }
      });

      vm.challenges.forEach(function (challenge) {
        if (challenge.id === id) {
          challenge.show = true;
        }
      });
    };

    vm.save = function () {

      let instructions = vm.geoJSON;
      let selectedChallengesIds = [];

      vm.selectedChallenges.forEach(function (challenge) {
        selectedChallengesIds.push(challenge.id);
      });

      let route = {
        date : new Date().toISOString(),
        name: vm.route.name,
        city: vm.route.city,
        province: vm.route.province,
        country: vm.route.country,
        challenges: selectedChallengesIds,
        geojson: instructions
      };

      console.log(route);

      if (route.name !== '' && route.name !== undefined &&
        route.city !== '' && route.city !== undefined &&
        route.province !== '' && route.province !== undefined &&
        route.country !== '' && route.country !== undefined &&
        route.challenges !== undefined &&
        route.geojson !== undefined) {
        routeService.addRoute(route);
      } else {
        console.log('\x1b[31m%s\x1b[0m', 'Error al rellenar el formulario, revise los campos e inténtelo de nuevo');
      }

    };

    vm.editChallenge = function (id) {
      $routeParams.challenge_id = id;
      $location.path('challenges/edit_challenge/' + $routeParams.challenge_id);
    };

    function initWatchers() {

      vm.challengeWatcher = $scope.$watch(
        function () {
          return challengeService.challengesLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getChallenges();
            challengeService.challengesLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
