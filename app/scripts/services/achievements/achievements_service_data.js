'use strict';

app.service('achievementsServiceData', ['$cookies', function($cookies){

  var serviceAchievements = {};

  serviceAchievements.achievementsList = [];
  serviceAchievements.achievementById = {};

  // serviceChallenge.challengeList = [
  //   { 'id': '01', 'date': '05/06/2021', 'name': 'Challenge 1', 'video': 'https://youtube.com/video1', 'bonus': 50, 'minMax': '50/100', 'images': 'imagen1'},
  //   { 'id': '02', 'date': '06/06/2021', 'name': 'Challenge 2', 'video': 'https://youtube.com/video2', 'bonus': 60, 'minMax': '50/100', 'images': 'imagen2'},
  //   { 'id': '03', 'date': '07/06/2021', 'name': 'Challenge 3', 'video': 'https://youtube.com/video3', 'bonus': 70, 'minMax': '50/100', 'images': 'imagen3'},
  //   { 'id': '04', 'date': '08/06/2021', 'name': 'Challenge 4', 'video': 'https://youtube.com/video4', 'bonus': 80, 'minMax': '50/100', 'images': 'imagen4'},
  //   { 'id': '05', 'date': '09/06/2021', 'name': 'Challenge 5', 'video': 'https://youtube.com/video5', 'bonus': 90, 'minMax': '50/100', 'images': 'imagen5'},
  //  ];

 return serviceAchievements;

}]);
