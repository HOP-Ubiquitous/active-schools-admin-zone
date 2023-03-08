'use strict';

app.service('avatarServiceData', ['$cookies', function($cookies){

  var serviceAvatar = {};

  serviceAvatar.avatarLevels = [];
  serviceAvatar.avatarLevelById = {};
  serviceAvatar.avatarAccessories = [];
  serviceAvatar.avatarAccessoryById = {};

 return serviceAvatar;

}]);
