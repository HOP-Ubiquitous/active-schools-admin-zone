'use strict';

app.controller('editRouteCtrl', ['$scope', '$location', '$window', '$routeParams', 'routeService', 'routeServiceData', 'challengeService', 'challengeServiceData', 'ICONS', 'languageService',
function ($scope, $location, $window, $routeParams, routeService, routeServiceData, challengeService, challengeServiceData, ICONS, languageService) {

  var vm = this;
  vm.icons = ICONS;
  vm.selectedMode = '';

  languageService.getSelectedLanguage();

  function updateLanguage() {
    vm.language = languageService.language;
    vm.countries = languageService.countries;
  }

  updateLanguage();

  vm.selectedModeTitle = languageService.language.ROUTES.modeRoute;
  vm.route = routeServiceData.routeList[$routeParams.route_id];
  vm.routeUpdated = routeService.routeUpdated;


  vm.routeData;
  vm.geoJSON = '';
  vm.selectedChallenges = [];
  vm.polyLinePoints = vm.route.waypoints; // Cargando ruta de test
  vm.challengePoints = vm.route.challenges;
  vm.selectedChallengesIds = [];
  vm.selectedChallenges = vm.route.challenges.selectedChallenges;
  vm.defaultLine = {};
  vm.line = {};

  vm.challenges = [];
  vm.allChallenges = [];
  vm.markers;

  challengeService.getChallenges();

  function getRoute() {
    vm.routeData = vm.allRoutes[route_id];
  }

  function getChallengesLoaded () {
    vm.challenges = challengeServiceData.challengeList;
  }

  function getChallenges () {
    vm.allChallenges = challengeServiceData.challengeList;
  }

  var routeMap = $window.L.map('routeMap').setView([38.08179, -1.275], 16);

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

  routeMap.fitBounds(vm.polyLineGroup.getBounds());

  vm.polyLinePoints.forEach(function(point, index) {
    vm.markers = L.marker(point, {icon: routePoint, draggable: true, index: index}).addTo(vm.markersGroup);
    vm.markers.on('click', removePointRoute);
    vm.markers.on('drag', updatePointWithDrag);
  });

  if (vm.challengePoints.length > 0 && vm.challengePoints !== undefined) {

    let selectedChallengesIds = [];
    
    let challengesArray = []  
    vm.challengesFormArray = [];

    vm.challengePoints.forEach(function(point) {

      Object.keys(point).forEach(function(key,value) {
        selectedChallengesIds.push(key);

        let object = {
          challenge_id: key,
          location: [point[key][0], point[key][1]]
        }

        challengesArray.push(object);
        selectedChallengesIds.push(key);

        vm.challengeMarkers = L.marker([point[key][0], point[key][1]], {icon: challengePoint, draggable: true}).addTo(vm.challengeGroup).on('click', removeChallengePoint);
      })

    });

    vm.challengesFormArray = challengesArray;
    vm.selectedChallengesIds = selectedChallengesIds;

    getChallengesLoaded();
    updateLegend();

  }

  vm.changeMapMode = function(mode) {
    vm.selectedMode = mode;

    if (mode === 'route') {

      vm.selectedModeTitle = languageService.language.ROUTES.modeRoute;

      routeMap.on('click', createPointWithClick);

      vm.markersGroup.eachLayer(function(marker) {
        marker.dragging.enable();
        marker._icon.style.display = 'block';
        marker.on('drag', updatePointWithDrag);
      });

      vm.line.off('click', createChallengePoint);

    } else {

      vm.selectedModeTitle = languageService.language.ROUTES.modeChallenge;

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
    var latLng = [e.latlng.lat, e.latlng.lng]
    vm.challengeMarkers = L.marker(latLng, {icon: challengePoint, draggable: true}).addTo(vm.challengeGroup).on('click', removeChallengePoint);
    createChallengesForm();
    updateLegend();
  }

  function removeChallengePoint(e) {
    let i = 0;
    let index = 0;

    vm.challengeGroup.eachLayer(function(layer) {
      
      if (layer._leaflet_id === e.target._leaflet_id) {
        index = i;
      }

      i++;
    });

    vm.challengeGroup.removeLayer(e.target._leaflet_id);
    vm.challengesFormArray.splice(index, 1);

    $scope.$apply(vm.challenges);

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

  function createChallengesForm() { //Crear objetos y array para el select

    let challengesArray = [];

    let i = 0;
    vm.challengeGroup.eachLayer(function(layer) {

      let object = {};

      if (vm.challengesFormArray[i] === undefined) {
        object = {
          challenge_id: undefined,
          location: [layer._latlng.lat, layer._latlng.lng]
        }
      } else {
        object = {
          challenge_id: vm.challengesFormArray[i].challenge_id,
          location: [layer._latlng.lat, layer._latlng.lng]
        }
      }

      challengesArray.push(object);

      i++;

    });

    vm.challengesFormArray = challengesArray;

    $scope.$apply(vm.challenges);

  }

  function updateLegend() {
    var challengeNumber = document.getElementById('challenge-number');
    challengeNumber.innerHTML = Object.keys(vm.challengeGroup._layers).length;
  }

  function checkChallenges () { //Comprobar formato de challenges

    let result = [];
    let challenges = [];

    vm.challengesFormArray.forEach(function(challenge) {
      if (challenge.challenge_id !== undefined) {
        challenges.push(challenge.challenge_id); //Se crea un array con solo los challenges que están configurados
      }
    });

    vm.challengesFormArray.forEach(function(challenge) {

      let selectedChallenge = '';

      if (challenge.challenge_id === undefined) {
        selectedChallenge = challenges[Math.floor(Math.random() * challenges.length)] //Si no hay challenge configurado, se elige uno al azar entre los configurados
      } else {
        selectedChallenge = challenge.challenge_id; //Si hay un challenge configurado se elige el configurado
      }

      challenge.location.forEach(function(coord) {
        coord.toFixed(15); //A las coordenadas se le ajusta un máximo de 15 decimales
      });

      let object = {
        [selectedChallenge]: challenge.location //Se monta el formato requerido por el backend
      }

      result.push(object);

    });
    return result; //Se devuelve el resultado
  }

  // -- -- //

  vm.edit = function () {

    let route = {
      route_name: vm.route.route_name,
      route_city: vm. route.route_city,
      route_province: vm.route.route_province,
      route_country: vm.route.route_country,
      waypoints: vm.polyLinePoints,
      challenges: checkChallenges()
    };

    if (route.route_name !== '' && route.route_name !== undefined &&
        route.route_city !== '' && route.route_city !== undefined &&
        route.route_province !== '' && route.route_province !== undefined &&
        route.route_country !== '' && route.route_country !== undefined &&
        route.waypoints !== '' && route.waypoints !== undefined &&
        route.challenges !== undefined) {
        routeService.editRoute(vm.route.route_id, route);
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'Error al rellenar el formulario, revise los campos e inténtelo de nuevo');
    }

  };

  vm.goToRoutes = function() {
    $location.path('routes');
  };

  function initWatchers() {

    vm.languageWatcher = $scope.$watch(
      function () {
        return languageService.formLanguageUpdated;
      }, function (newValue) {
        if (newValue === true) {
          updateLanguage();
          languageService.formLanguageUpdated = false;
        }
      }
    );

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

    // vm.routeUpdatedWatcher = $scope.$watch(
    //   function () {
    //     return routeService.routeUpdated;
    //   }, function (newValue) {
    //     //TODO Revisar mostrar notificaciones
    //     vm.routeUpdated = newValue;
    //     $scope.$apply(vm.routeUpdated);
    //   }
    // );

  }

  initWatchers();

}]);
