  app.controller('mainMenuCtrl', ['$location', 'userServiceData', '$routeParams', 'ICONS',
    function ($location, userServiceData, $routeParams, ICONS) {

      var vm = this;
      vm.icons = ICONS;
      vm.userServiceData = userServiceData;

      vm.goToHome = function () {
        $location.path('/home');
      };

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


      vm.goToLogin = function () {

        userServiceData.loggedUser = {};
        $location.path('/login');

      };

    }
  ]
);
