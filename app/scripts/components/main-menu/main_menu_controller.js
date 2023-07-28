  app.controller('mainMenuCtrl', ['$location', 'userService', 'userServiceData', '$routeParams', 'ICONS', 'EL', 'EN', 'ES',
    function ($location, userService, userServiceData, $routeParams, ICONS, EL, EN, ES) {

      var vm = this;
      vm.icons = ICONS;
      vm.userService = userService;
      vm.userServiceData = userServiceData;

      if (navigator.language === 'el') {
        vm.language = EL;
      } else if (navigator.language === 'en') {
        vm.language = EN;
      } else if (navigator.language === 'es') {
        vm.language = ES;
      } else {
        vm.language = EN;
      }

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

      // vm.goToMedicalCenters = function () {
      //   $location.path('/medical_centers');
      // };

      vm.goToSchools = function () {
        $location.path('/schools');
      };


      vm.goToLogin = function () {

        userService.logout();

      };

    }
  ]
);
