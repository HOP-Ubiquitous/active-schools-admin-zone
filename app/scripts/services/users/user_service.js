'use strict';

app.service('userService', ['userServiceApi', 'userServiceData', '$location', '$q', '$cookies', '$timeout',
  function(userServiceApi, userServiceData, $location, $q, $cookies, $timeout){

  var service = this;
  service.usersLoaded = false;
  service.userByIdLoaded = false;
  service.userLoadedAfterLogin = false;
  service.newGoogleUser = false;

  service.getUsers = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.get_users().then(
      function (response) {
        service.usersLoaded = true;
        userServiceData.userList = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Usuarios cargados con éxtito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los usuarios! :_(');
      }
    );

    return promise;

  };

  service.getUserById = function(user_id, type) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.get_user_by_id(user_id).then(
      function success (response) {
        userServiceData.userById = response.data;
        service.userByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El usuario ' + user_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el usuario ' + user_id + '! :_(');
      }
    );

    return promise;

  };

  service.addUser = function (data, type) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.add_user(data).then(
      function success(response){

        console.log('\x1b[32m%s\x1b[0m', 'Usuario añadido con éxito! :)');
        
        if (type === 'addUser') {
          //service.getUserById(response.data.id, type);
          
          let userInfo = {
            username: data.username,
            password: data.password
          }

          service.login(userInfo, 'no-redirect');
          service.userLoadedAfterLogin = true;
          
        } else {
          service.getUsers();
          $location.path('/users');
        }

      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear usuario! :_(');
      }
    );

    return promise;

  };

  service.editUser = function (user_id, data, type) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.edit_user(user_id, data).then(
      function success(response){
        
        if (type !== undefined) {
          service.getUserById(response.data, type);
        }

        service.getUsers();
        $location.path('/users');
        console.log('\x1b[32m%s\x1b[0m', 'El usuario ' + user_id + ' ha sido editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar el usuario ' + user_id + '! :_(');
      }
    );

    return promise;
  };

  service.deleteUser = function (user_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.delete_user(user_id).then(
      function success(response){
        service.getUsers();
        console.log('\x1b[32m%s\x1b[0m', 'El usuario ' + user_id + ' borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el usuario ' + user_id + '! :_(');
      }
    );

    return promise;
  };

  service.successRoute = function (user_id, route_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.success_route(user_id, route_id, data).then(
      function success(response){
        service.getUsers();
        console.log('\x1b[32m%s\x1b[0m', 'El estado de la ruta ' + route_id + ' para el usuario ' + user_id + ' ha sido modificado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el estado del reto ' + route_id + ' para el usuario ' + user_id + '! :_(');
      }
    );

    return promise;
  };

  service.successChallenge = function (user_id, route_id, challenge_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.success_challenge(user_id, route_id, challenge_id, data).then(
      function success(response){
        service.getUsers();
        console.log('\x1b[32m%s\x1b[0m', 'El estado del challenge ' + challenge_id + ' la ruta ' + route_id + ' para el usuario ' + user_id + ' ha sido modificado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el estado del challenge ' + challenge_id + ' del reto ' + route_id + ' para el usuario ' + user_id + '! :_(');
      }
    );

    return promise;
  };

  service.login = function(data, type) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.login(data).then(
      function success (response) {

        userServiceData.accessToken = response.data.access_token;
        $cookies.put('access_token', response.data.access_token);
        
        userServiceData.loggedUser = response.data;
        $cookies.put('active_school_user', JSON.stringify(response.data));

        if (type !== 'no-redirect') {
          $location.path('/home');
        }

        // service.getLoggedUser(response.data.user_id)
        service.userLoadedAfterLogin = true;
        console.log('\x1b[32m%s\x1b[0m', 'Usuario logueado con éxito! :)');

      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al loguear el usuario! :_(');
      }
    );

    return promise;

  };

  service.googleLogin = function(data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.login(data).then(
      function success (response) {

        userServiceData.accessToken = response.data.access_token;
        $cookies.put('access_token', response.data.access_token);

        userServiceData.loggedUser = response.data;
        // $cookies.put('active_school_user', JSON.stringify(response.data));

        service.userLoadedAfterLogin = true;
        service.newGoogleUser = false;

        $location.path('/home');

        console.log('\x1b[32m%s\x1b[0m', 'Usuario logueado con éxito! :)');

      }
    ).catch(
      function () {
        service.newGoogleUser = true;
        console.log('\x1b[31m%s\x1b[0m', 'Error al loguear el usuario! :_(');
      }
    );

    return promise;

  };

  service.logout = function() {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.logout().then(
      function success (response) {
        
        userServiceData.loggedUser = {};
        service.userLoadedAfterLogin = true;
        $location.path('/login');
        console.log('\x1b[32m%s\x1b[0m', 'Usuario deslogueado con éxito! :)');

      }
    ).catch(
      function () {
        userServiceData.loggedUser = {};
        $location.path('/login');
        console.log('\x1b[31m%s\x1b[0m', 'Error al desloguear el usuario! :_(');
      }
    );

    return promise;

  };

  service.refreshToken = function() {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.refresh_token().then(
      function success (response) {
        
        userServiceData.loggedUser = {};
        //TODO Guardar token en una $cookie
        service.userLoadedAfterLogin = true;
        console.log('\x1b[32m%s\x1b[0m', 'Token recibido con éxito! :)');

      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al recibir token! :_(');
      }
    );

    return promise;

  };

}]);
