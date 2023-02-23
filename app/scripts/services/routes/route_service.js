'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('routeService', ['routeServiceApi', 'routeServiceData', '$location', '$timeout', '$q',
  function(routeServiceApi, routeServiceData, $location, $timeout, $q){

    var service = this;
    service.routesLoaded = false;
    service.routeByIdLoaded = false;
    service.routeChallengesLoaded = false;
    service.routeUpdated = false;

    service.getRoutes = function () {

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.get_routes().then(
        function success (response) {
          service.routesLoaded = true;
          routeServiceData.routeList = [];
          routeServiceData.routeList = response.data;
          console.log('\x1b[32m%s\x1b[0m', 'Rutas cargadas con éxito! :)');
        }
      ).catch(
        function (error) {
          console.log('\x1b[31m%s\x1b[0m', 'Error al cargar las rutas! :_(');
        }
      );

      return promise;

    };

    service.getRouteById = function (route_id) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.get_route_by_id(id).then(
        function success (response) {
          service.routeByIdLoaded = true;
          routeServiceData.routeById = response.data;
          console.log('\x1b[32m%s\x1b[0m', 'Ruta con id ' + route_id + ' cargada con éxtito! :)');
        }
      ).catch(
        function (error) {
          console.log('\x1b[31m%s\x1b[0m', 'Error al carga las ruta con id ' + route_id + '! :_(');
        }
      );

      return promise;

    };

    service.addRoute = function (data){

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.add_route(data).then(
        function success (response) {
          service.getRoutes();
          console.log('\x1b[32m%s\x1b[0m', 'Ruta añadida con éxito! :)');
        }
      ).catch(
        function () {
          console.log('\x1b[31m%s\x1b[0m', 'Error al añadir la ruta! :_(');
        }
      );

      return promise;

    };

    service.editRoute = function (route_id, data) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.edit_route(route_id, data).then(
        function success (response){
          service.routeUpdated = true;
          
          $timeout(function(){
            $location.path('routes')
            service.routeUpdated = false;
          }, 4000);
          
          // service.getRoutes();
          console.log('\x1b[32m%s\x1b[0m', 'Ruta ' + route_id + ' editada con éxito! :)');
        }
      ).catch(
        function (){
          console.log('\x1b[31m%s\x1b[0m', 'Error al editar la ruta ' + route_id + '! :_(');
        }
      );

      return promise;

    };

    service.deleteRoute = function (route_id) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.delete_route(route_id).then(
        function success (response){
          service.getRoutes();
          console.log('\x1b[32m%s\x1b[0m', 'Ruta ' + route_id + ' borrada con éxito! :)');
        }
      ).catch(
        function (){
          console.log('\x1b[31m%s\x1b[0m', 'Error al borrar la ruta ' + route_id + '! :_(');
        }
      );

      return promise;

    };

    service.getChallengesByRouteId = function (route_id) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.get_challenges_by_route_id(route_id).then(
        function (response) {
          service.routeChallengesLoaded = true;
          routeServiceData.challengesByRoute = response.data;
          console.log('\x1b[32m%s\x1b[0m', 'Retos de la ruta con id ' + route_id + ' cargados con éxito! :)');
        }
      ).catch(
        function (error) {
          console.log('\x1b[31m%s\x1b[0m', 'Error al cargar lo retos de la ruta con id ' + route_id + '! :_(');
        }
      );

      return promise;

    };


  }]);
