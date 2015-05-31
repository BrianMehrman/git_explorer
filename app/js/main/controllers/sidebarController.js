'use strict';

// create the controller and inject Angular's $scope
angular.module('mainApp')
  .controller('sidebarController', ["$scope", "$state", "$cookieStore", "GithubEvents", function($scope, $state, $cookieStore, GithubEvents) {
      // create a message to display in our view

      var updateUserList = function(){
        $scope.users=[];

        var usernames = $cookieStore.get("valid_usernames");
        if (typeof(usernames) === "undefined") usernames="";
        usernames = usernames.split(",");

        if (usernames !== ""){
          for(var i in usernames){
            name = usernames[i];
            if (name != ""){
              $scope.users.push({name: name, url: "/#"+name});
            }
          }
        }
      }

      updateUserList();

      $scope.$watch(function() { return $cookieStore.get("valid_usernames"); }, function(){
        updateUserList();
      });

  }]);


