'use strict';

app.service('userServiceData', ['$cookies', function($cookies){

  var serviceUser = {};

  serviceUser.userList = [];
  serviceUser.userById = {};
  serviceUser.accessToken = '';

  if ($cookies.get('access_token') !== undefined) {
    serviceUser.accessToken = $cookies.get('access_token');
  } else {
    serviceUser.accessToken = '';
  }

  if ($cookies.get('active_school_user') !== undefined) {
    serviceUser.loggedUser = JSON.parse($cookies.get('active_school_user'));
  } else {
    serviceUser.loggedUser = {};
  }

 return serviceUser;

}]);
