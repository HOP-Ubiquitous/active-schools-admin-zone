  app.controller('homeCtrl', [
    '$location',
    '$scope',
    'userService',
    'userServiceData',
    'routeService',
    'routeServiceData',
    'challengeService',
    'challengeServiceData',
    'ICONS',
    'languageService',
    function ($location,
              $scope,
              userService,
              userServiceData,
              routeService,
              routeServiceData,
              challengeService,
              challengeServiceData,
              ICONS,
              languageService) {

      var vm = this;
      vm.icons = ICONS;
      vm.userServiceData = userServiceData;
      vm.user = userServiceData.loggedUser;
      vm.routes = [];
      vm.challenges = [];
      vm.users = [];

      routeService.getRoutes();
      challengeService.getChallenges();
      userService.getUsers();

      languageService.getSelectedLanguage();

      function updateLanguage() {
        vm.language = languageService.language;
        vm.countries = languageService.countries;
      }

      updateLanguage();

      function getRoutes () {
        vm.routes = routeServiceData.routeList;
      }

      function getChallenges () {
        vm.challenges = challengeServiceData.challengeList;
      }

      function getUsers () {
        vm.users = userServiceData.userList;
      }

      vm.goToRoutes = function () {
        $location.path('/routes');
      };

      vm.goToChallenges = function () {
        $location.path('/challenges');
      };

      vm.goToPosts = function () {
        $location.path('/posts');
      };

      vm.goToProfile = function () {
        $location.path('/profile');
      };

      vm.goToUsers = function () {
        $location.path('/users');
      };

      vm.goToTeams = function () {
        $location.path('/teams');
      };

      vm.goToMedicalCenters = function () {
        $location.path('/medical_centers');
      };

      vm.goToSchools = function () {
        $location.path('/schools');
      };

      function initWatchers() {

        vm.languageWatcher = $scope.$watch(
          function () {
            return languageService.languageUpdated;
          }, function (newValue) {
            if (newValue === true) {
              updateLanguage();
              languageService.languageUpdated = false;
            }
          }
        );

        vm.routeWatcher = $scope.$watch(
          function () {
            return routeService.routesLoaded;
          }, function (newValue) {
            if (newValue === true) {
              getRoutes();
              routeService.routesLoaded = false;
            }
          }
        );

        vm.challengeWatcher = $scope.$watch(
          function () {
            return challengeService.allChallengesLoaded;
          }, function (newValue) {
            if (newValue === true) {
              getChallenges();
              challengeService.allChallengesLoaded = false;
            }
          }
        );

        vm.userWatcher = $scope.$watch(
          function () {
            return userService.usersLoaded;
          }, function (newValue) {
            if (newValue === true) {
              getUsers();
              userService.usersLoaded = false;
            }
          }
        );
      
      }

      initWatchers();

    }
  ]
);

