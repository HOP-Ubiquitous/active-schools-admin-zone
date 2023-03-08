'use strict';

app.service('routeServiceApi', ['$http', 'API_URL', 'userServiceData', function($http, API_URL, userServiceData) {

  var apiService = {};
  var apiURL = API_URL.url;
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + userServiceData.accessToken
  }

  var test = {
    "fiware-service": "puertomalaga",
    "fiware-servicepath": "/puertomalaga",
    "Authorization": "Basic cWxfcm86VkRhUDNGaHBmVU42RlQzR1RIcVZReklmUFdKT1F1dHM="
  }

  apiService.get_routes = function () {
    return $http({
      method: 'GET',
      url: 'https://fiware.hopu.eu/quantumleap-readonly/v2/attrs?type=device_lastdata&attrs=location,controlledDatamodels&lastN=1000',
      headers: test
    });
  };

  apiService.get_route_by_id = function (route_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'routes/' + route_id,
      headers: headers
    });
  };

  apiService.get_challenges_by_route_id = function (route_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'routes/' + route_id + '/challenges',
      headers: headers
    });
  };

  apiService.add_route = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'routes',
      headers: headers
    });
  };

  apiService.edit_route = function (route_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'routes/' + route_id,
      headers: headers
    });
  };

  apiService.delete_route = function (route_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'routes/' + route_id,
      headers: headers
    });
  };

  return apiService;

}]);
