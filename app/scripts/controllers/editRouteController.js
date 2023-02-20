'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('editRouteCtrl', ['$scope', '$location', '$window', '$routeParams', 'routeService', 'routeServiceData', 'challengeService', 'challengeServiceData', 'ICONS', 'COUNTRIES',
function ($scope, $location, $window, $routeParams, routeService, routeServiceData, challengeService, challengeServiceData, ICONS, COUNTRIES) {

  var vm = this;
  vm.icons = ICONS;
  vm.countries = COUNTRIES.countries;
  vm.selectedMode = '';
  vm.selectedModeTitle = 'Route Edit Mode';
  let route = routeServiceData.routeList[$routeParams.route_id];


  vm.routeData;
  vm.geoJSON = '';
  vm.selectedChallenges = [];
  vm.polyLinePoints = route.waypoints; // Cargando ruta de test
  vm.challengePoints =  route.challenges;
  vm.selectedChallenges =  route.challenges.selectedChallenges;
  vm.defaultLine = {};
  vm.line = {};

  var challengeList;
  vm.challenges = [];
  vm.markers;

  challengeService.getChallenges();

  function getChallengesLoaded () {
      //Se trae todos los retos pero los filtra con los ids del vm.uniqueChallengesIds y solo muestra los que coincidan
      vm.challengesLoaded = challengeServiceData.challengeList.filter(challenge => vm.uniqueChallengesIds.includes(challenge.challenge_id));
  }

  function getChallenges () {

    challengeList = challengeServiceData.challengeList;

    challengeList.forEach(function(challenge) {
      vm.selectedChallenges.forEach(function(singleChallenge) {
        if (challenge.id === singleChallenge) {
          vm.challenges.push(challenge);
        }
      });
    });

    console.log(vm.challenges);

  }

  var routeMap = $window.L.map('routeMap').setView([38.08179, -1.275], 16);
  console.log(routeMap);

  $window.L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png').addTo(routeMap);

  createLegend();

  var routePoint = L.divIcon({
    className: "route-point",
    iconAnchor: [5, 5],
    html: '<span></span>'
  });

  var challengePoint = L.divIcon({
    className: "challenge-point",
    iconAnchor: [5, 5],
    html: '<span></span>'
  });

  vm.markersGroup = L.featureGroup();
  vm.polyLineGroup = L.featureGroup();
  vm.challengeGroup = L.featureGroup();

  vm.markersGroup.addTo(routeMap);
  vm.polyLineGroup.addTo(routeMap);
  vm.challengeGroup.addTo(routeMap);

  vm.line = new L.Polyline(vm.polyLinePoints, {color: '#00a195', draggable: true}).addTo(vm.polyLineGroup);

  vm.polyLinePoints.forEach(function(point, index) {
    vm.markers = L.marker(point, {icon: routePoint, draggable: true, index: index}).addTo(vm.markersGroup);
    vm.markers.on('click', removePointRoute);
    vm.markers.on('drag', updatePointWithDrag);
  });

  if (vm.challengePoints.length > 0 && vm.challengePoints !== undefined) {
    debugger;
    vm.challengePoints.forEach(function(point) {
      console.log(point);
      Object.keys(point).forEach(function(key,value) {
        vm.challengeMarkers = L.marker([point[key][0], point[key][1]], {icon: challengePoint, draggable: true}).addTo(vm.challengeGroup).on('click', removeChallengePoint);
      })

    });
    updateLegend();

  }

  vm.changeMapMode = function(mode) {
    vm.selectedMode = mode;

    if (mode === 'route') {

      vm.selectedModeTitle = 'Route Edit Mode';

      routeMap.on('click', createPointWithClick);

      vm.markersGroup.eachLayer(function(marker) {
        marker.dragging.enable();
        marker._icon.style.display = 'block';
        marker.on('drag', updatePointWithDrag);
      });

      vm.line.off('click', createChallengePoint);

    } else {

      vm.selectedModeTitle = 'Challenge Positioning Mode';

      routeMap.off('click', createPointWithClick);

      vm.markersGroup.eachLayer(function(marker) {
        marker.dragging.disable();
        marker._icon.style.display = 'none';
        marker.off('drag', updatePointWithDrag);
      });

      vm.line.on('click', createChallengePoint);

    }

  }

  vm.changeMapMode('route');

  function createPointWithClick(e) {
    console.log('Latitud: ' + e.latlng.lat + ' - Longitud: ' + e.latlng.lng);
    var latLng = [e.latlng.lat, e.latlng.lng]
    createPoint(latLng);
    updatePolyline();
  }

  function updatePointWithDrag(e) {
    var latLng = [e.latlng.lat, e.latlng.lng]
    updatePoint(e.target.options.index, latLng);
  }

  function createPoint(newPosition) {
    vm.polyLinePoints.push(newPosition);
    vm.markers = L.marker(newPosition, {icon: routePoint, draggable: true, index: vm.polyLinePoints.length - 1}).addTo(vm.markersGroup);
    vm.markers.on('click', removePointRoute);
    vm.markers.on('drag', updatePointWithDrag);
  }

  function updatePoint(index, newPosition) {
    vm.polyLinePoints[index] = newPosition;
    updatePolyline();
  }

  function removePointRoute(e) {
    vm.polyLinePoints.splice(e.target.options.index, 1)
    vm.markersGroup.eachLayer(function(marker) {
      if(marker.options.index > e.target.options.index) {
        marker.options.index = marker.options.index - 1;
      }
    });
    vm.markersGroup.removeLayer(e.target._leaflet_id);
    updatePolyline();
  }

  function updatePolyline() {
    vm.line.setLatLngs(vm.polyLinePoints);
  }

  function createChallengePoint(e) {
  debugger;
    var latLng = [e.latlng.lat, e.latlng.lng]
    vm.challengeMarkers = L.marker(latLng, {icon: challengePoint, draggable: true}).addTo(vm.challengeGroup).on('click', removeChallengePoint);
    updateLegend();
  }

  function removeChallengePoint(e) {
    vm.challengeGroup.removeLayer(e.target._leaflet_id);
    updateLegend();
  }

  function createLegend() {
    var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'challenge-legend');

      div.innerHTML = '<i class="legend-diamond" style="background: #00a195"></i> <span>Challenges: <span id="challenge-number" style="font-weight: 700">0</span></span>'

      return div;
    }

    legend.addTo(routeMap);
  }

  function updateLegend() {
    var challengeNumber = document.getElementById('challenge-number');
    challengeNumber.innerHTML = Object.keys(vm.challengeGroup._layers).length;
  }

  // -- -- //

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

      //let instructions = vm.geoJSON;
      let selectedChallengesIds = [];

      vm.selectedChallenges.forEach(function (challenge) {
        selectedChallengesIds.push(challenge.challenge_id);
      });

      let route = {
        route_name: vm.route.route_name,
        route_city: vm.route.route_city,
        route_province: vm.route.route_province,
        route_country: vm.route.route_country,
        waypoints: vm.polyLinePoints,
        challenges: selectedChallengesIds,
        //geojson: instructions
      };

      console.log(route);

      if (route.route_name !== '' && route.route_name !== undefined &&
        route.route_city !== '' && route.route_city !== undefined &&
        route.route_province !== '' && route.route_province !== undefined &&
        route.route_country !== '' && route.route_country !== undefined &&
        route.waypoints !== '' && route.route_country !== undefined &&
        route.challenges !== undefined) {
        //route.geojson !== undefined) {
        routeService.editRoute($routeParams.route_id, route);
      } else {
        console.log('\x1b[31m%s\x1b[0m', 'Error al rellenar el formulario, revise los campos e inténtelo de nuevo');
      }

    };

    vm.editChallenge = function (id) {
      $routeParams.challenge_id = id;
      $location.path('challenges/edit_challenge/' + $routeParams.challenge_id);
    };

    function getRoute(){
      vm.routeData = vm.allRoutes[route_id];
    }

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
