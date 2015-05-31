'use strict';

// create the controller and inject Angular's $scope
angular.module('mainApp')
  .controller('mainController', ["$scope", "$state", "$stateParams", function($scope, $state, $stateParams) {
      // create a message to display in our view
      $scope.search_loading = false;

      $scope.searchUser = function(user_name){
        $state.go("home.graph", {username: user_name});
      }

  }]);


