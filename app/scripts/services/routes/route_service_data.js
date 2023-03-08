'use strict';

 app.service('routeServiceData', ['$cookies', function($cookies){

   var serviceRoute = {};

   serviceRoute.routeList = [];
   serviceRoute.routeById = {};
   serviceRoute.challengesByRoute = [];

  // serviceRoute.routeList = [
  //   { 'id': '01', 'date': '05/06/2021', 'name': 'Ruta 1', 'city': 'Archena', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge 1" },
  //   { 'id': '02', 'date': '06/07/2021','name': 'Ruta 2', 'city': 'Ricote', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge 2" },
  //   { 'id': '03', 'date': '07/08/2021', 'name': 'Ruta 3', 'city': 'Ojós', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge 3" },
  //   { 'id': '04', 'date': '08/09/2021','name': 'Ruta 4', 'city': 'Villanuea', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge 4" },
  //   { 'id': '05', 'date': '09/03/2021','name': 'Ruta 5', 'city': 'Blanca', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge 5" },
  // ];

  return serviceRoute;

}]);
