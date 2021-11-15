'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('editRouteCtrl', ['$scope', '$location', '$window', '$routeParams', 'routeService', 'routeServiceData', 'challengeService', 'challengeServiceData',
  function ($scope, $location, $window, $routeParams, routeService, routeServiceData, challengeService, challengeServiceData) {

    var vm = this;

    routeService.getRouteById($routeParams.route_id);
    challengeService.getChallenges();

    vm.route = {};
    vm.geoJSON = '';
    vm.selectedChallenges = [];

    function getRoute() {
      vm.route = routeServiceData.routeById;
      console.log(vm.route);

      showMap();
    }

    function getChallenges () {
      vm.challenges = challengeServiceData.challengeList;

      vm.challenges.forEach(function (challenge) {
        challenge.show = true;
      });

    }

    function showMap() {
      function getWaypoints(points) {

        let waypoints = [];

        points.forEach(function (point) {
          waypoints.push($window.L.latLng(point.geometry.coordinates[0], point.geometry.coordinates[1]));
        });

        return waypoints;
      }

      var routeMap = $window.L.map('routeMap').setView([50.27264, 7.26469], 13);
      console.log(routeMap);

      $window.L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png').addTo(routeMap);

      $window.L.Icon.extend({
        options: {
          shadowUrl: 'leaf-shadow.png'
        }
      });

      var control = $window.L.Routing.control({
        waypoints: getWaypoints(vm.route.geojson.features)
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
    }

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

    vm.edit = function () {

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
        routeService.editRoute($routeParams.route_id, route);
      } else {
        console.log('\x1b[31m%s\x1b[0m', 'Error al rellenar el formulario, revise los campos e inténtelo de nuevo');
      }

    };

    vm.editChallenge = function (id) {
      $routeParams.challenge_id = id;
      $location.path('challenges/edit_challenge/' + $routeParams.challenge_id);
    };

    function initWatchers() {

      vm.routeWatcher = $scope.$watch(
        function () {
          return routeService.routeByIdLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getRoute();
            routeService.routeByIdLoaded = false;
          }
        }
      );

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
