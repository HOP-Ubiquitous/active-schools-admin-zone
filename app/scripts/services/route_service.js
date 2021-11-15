'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('routeService', ['routeServiceApi', 'routeServiceData', '$location', '$q',
  function(routeServiceApi, routeServiceData, $location, $q){

    var service = this;
    service.routesLoaded = false;
    service.routeByIdLoaded = false;
    service.routeChallengesLoaded = false;

    service.getRoutes = function () {

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.get_routes().then(function success (response) {
        service.routesLoaded = true;
        routeServiceData.routeList = [];
        routeServiceData.routeList = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Rutas cargadas con éxtito! :)');
      }).catch(function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar las rutas! :_(');
      });

      return promise;
    };

    service.getRouteById = function (id) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.get_route_by_id(id).then(function success (response) {
        service.routeByIdLoaded = true;
        routeServiceData.routeById = {};
        routeServiceData.routeById = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Ruta con id ' + id + ' cargada con éxtito! :)');
      }).catch(function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al carga las ruta con id ' + id + '! :_(');
      });

      return promise;
    };

    service.addroute = function (route){

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.add_route(route).then(function success (response) {
        service.getRoutes();
        console.log('\x1b[32m%s\x1b[0m', 'Ruta añadida con éxito! :)');
      }).catch(function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al añadir la ruta! :_(');
      });

      return promise;
    };

    service.editRoute = function (id, route) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.edit_route(id, route).then(function success (response){
        service.getRoutes();
        console.log('\x1b[32m%s\x1b[0m', 'Ruta ' + id + ' editada con éxito! :)');
      }).catch(function (){
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar la ruta ' + id + '! :_(');
      });

      return promise;
    };

    service.deleteRoute = function (id) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.delete_route(id).then(function success (response){
        service.getRoutes();
        console.log('\x1b[32m%s\x1b[0m', 'Ruta ' + id + ' borrada con éxito! :)');
      }).catch(function (){
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar la ruta ' + id + '! :_(');
      });

      return promise;
    };

    service.getChallengesByRouteId = function (id) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      routeServiceApi.get_challenges_by_route_id(id).then(function (response) {
        service.routeChallengesLoaded = true;
        routeServiceData.challengesByRoute = [];
        routeServiceData.challengesByRoute = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Retos de la ruta con id ' + id + ' cargados con éxtito! :)');
      }).catch(function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar lo retos de la ruta con id ' + id + '! :_(');
      });

      return promise;
    };


  }]);
