app.controller('mainMenuCtrl',
  ['$location', '$routeParams',
    function ($location, $routeParams) {

      var vm = this;

      vm.goToRoutes = function () {
        $location.path('/routes');
      };

      vm.goToChallenges = function () {
        $location.path('/challenges');
      };

      vm.goToPosts = function () {
        $location.path('posts');
      };

      vm.goToProfile = function () {
        $location.path('/profile');
      };

      vm.goToLogin = function () {
        //TODO Añadir función del logout cuando esté disponible
        $location.path('/login');
      };

    }
  ]
);
