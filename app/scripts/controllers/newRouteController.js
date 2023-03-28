'use strict';

app.controller('newRouteCtrl', ['$scope', '$location', '$window', '$routeParams', 'routeService', 'challengeService', 'challengeServiceData', 'ROUTE', 'ICONS', 'COUNTRIES',
  function ($scope, $location, $window, $routeParams, routeService, challengeService, challengeServiceData, ROUTE, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.newRouteUpdated = routeService.newRouteUpdated;

    vm.selectedMode = '';
    vm.selectedModeTitle = 'Route Edit Mode';

    vm.route = {};
    vm.geoJSON = '';
    vm.selectedChallenges = [];
    vm.polyLinePoints = []; // Cargando ruta de test
    vm.challengePoints = [];
    vm.defaultLine = {};
    vm.line = {};
    vm.challengesFormArray = [];

    vm.markers;

    challengeService.getChallenges();

    function getChallenges () {
      vm.challenges = challengeServiceData.challengeList;
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
      vm.challengePoints.forEach(function(point) {
        vm.challengeMarkers = L.marker(point, {icon: challengePoint, draggable: true}).addTo(vm.challengeGroup).on('click', removeChallengePoint);
      });
      updateLegend();
      createChallengesForm();
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
      console.log(vm.polyLinePoints);
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

    //Habría que modificar esta función para que llame a otra que actualice los números de selects de challenges (un select por challenge)
    function createChallengePoint(e) {
      var latLng = [e.latlng.lat, e.latlng.lng]
      vm.challengeMarkers = L.marker(latLng, {icon: challengePoint, draggable: true}).addTo(vm.challengeGroup).on('click', removeChallengePoint);
      updateLegend();
      createChallengesForm();
      console.log(vm.challengeGroup._layers);
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

    function updateLegend() {
      var challengeNumber = document.getElementById('challenge-number');
      challengeNumber.innerHTML = Object.keys(vm.challengeGroup._layers).length;
    }

    function createChallengesForm() { //Crear objetos y array para el select

      let challengesArray = []
      
      vm.challengesFormArray = [];

      vm.challengeGroup.eachLayer(function(layer) {

        let object = {
          challenge_id: undefined,
          location: [layer._latlng.lat, layer._latlng.lng]
        }

        challengesArray.push(object);
      });

      vm.challengesFormArray = challengesArray;

      $scope.$apply(vm.challenges);

    }

    vm.updateChallengeForm = function(index, value) { //Función update, se modifica cada vez que cada vez que cambia el valor de un select

      vm.challengesFormArray[index].challenge_id = value;

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

    vm.save = function () {

      let route = {
        route_name: vm.route.route_name,
        route_city: vm. route.route_city,
        route_province: vm.route.route_province,
        route_country: vm.route.route_country,
        waypoints: vm.polyLinePoints,
        challenges: checkChallenges(),
        //geojson: instructions
      };

      console.log(route);

      if (route.route_name !== '' && route.route_name !== undefined &&
        route.route_city !== '' && route.route_city !== undefined &&
        route.route_province !== '' && route.route_province !== undefined &&
        route.route_country !== '' && route.route_country !== undefined &&
        route.waypoints !== '' && route.waypoints !== undefined &&
        route.challenges !== undefined) {
        //route.geojson !== undefined) {
        routeService.addRoute(route);
      } else {
        console.log('\x1b[31m%s\x1b[0m', 'Error al rellenar el formulario, revise los campos e inténtelo de nuevo');
      }

    };

    vm.editChallenge = function (id) {
      $routeParams.challenge_id = id;
      $location.path('challenges/edit_challenge/' + $routeParams.challenge_id);
    };

    vm.goToRoutes = function() {
      $location.path('routes');
    };

    function initWatchers() {

      vm.newRouteChallengeWatcher = $scope.$watch(
        function () {
          return challengeService.newRouteChallengesLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getChallenges();
            challengeService.newRouteChallengesLoaded = false;
          }
        }
      );

      // vm.newRouteUpdatedWatcher = $scope.$watch(
      //   function () {
      //     return routeService.newRouteUpdated;
      //   }, function (newValue) {
      //     vm.newRouteUpdated = newValue;
      //     $scope.$apply(vm.newRouteUpdated);
      //   }
      // );

    }

    initWatchers();

  }]);
