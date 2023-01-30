app.controller('newButtonCtrl', ['$location', '$routeParams', 'ICONS',
    function ($location, $routeParams, ICONS) {

      var vm = this;

      vm.icons = ICONS;

    }
  ]
);
