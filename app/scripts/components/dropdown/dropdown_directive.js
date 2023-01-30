app.directive('dropdown', function () {

  return {
    restrict: 'EA',
    scope: {
      showDropdown: '=',
      activeDropdown: '=',
      // dropdownFunction: '@',
      model: '=',
      placeholder: '@',
      dropdownStyle: '=',
      showDefaultOption: '=',
      defaltOptionValue: '@',
      defaultOptionName: '@',
      repeater: '=',
      // repeaterValue: '@',
      // repeaterName: '@',
      getOptionFunction: '&',
      showRightColumn: '@',
      deleteOptionFunction: '&'
    },
    controller: 'dropdownCtrl',
    controllerAs: 'dropdown',
    templateUrl: 'views/dropdown.html'
  };

});
