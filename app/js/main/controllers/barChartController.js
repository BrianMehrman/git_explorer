'use strict';
// create the controller and inject Angular's $scope
angular.module('mainApp')
  .controller('barChartController', ["$scope", "$q", "$stateParams", "$cookieStore","GithubEvents", "GithubService",
   function($scope, $q, $stateParams, $cookieStore, GithubEvents, GithubService) {
      // create a message to display in our view
      $scope.search_loading = false;
      $scope.chartData = [];
      $scope.title ="name";

      $scope.getEventPage = function(name,page){
        var deferred = $q.defer();

        GithubEvents.query({username: name, page: page}, function(d){
          deferred.resolve(d);
        }, function(errorResult) {
          deferred.reject(errorResult);
        });
        return deferred.promise;
      }

      $scope.searchUser = function(user_name){
        $scope.search_message = "searching for " + user_name;
        $scope.events=undefined;
        $scope.search_loading=true;
        $scope.error_msg=undefined;
        var pages = [];

        for(var i=0;i<10;i++){ pages.push($scope.getEventPage(user_name,i+1));}

        $q.all(pages).then(function(data_sets){
          var d = [].concat.apply([],data_sets);
          $scope.addUserSearch(user_name);
          $scope.events=d;
          $scope.search_loading=false;
          $scope.chartData = $scope.getEventTypeData(d);
        }, function(errorResult) {
          // do something on error
          $scope.search_loading=false;
          if(errorResult.status === 404) {
            $scope.error_msg="Sorry that user is not found.";
          }
        });
      }

      $scope.getEventTypeData = function(events){
        var types={},
            out = [];
        for(var i=0;i<events.length; i++){
          var e = events[i];
          var time = e["created_at"];
          var type = e["type"];
          types[type] ? types[type]+=1 : types[type] = 1;
        }
        for(var t in types){out.push({name:t, amount:types[t]});}
        return out;
      }

      $scope.addUserSearch = function(username){
        var usernames = $cookieStore.get("valid_usernames");
        $cookieStore.remove("valid_usernames");
        if (typeof(usernames) === "undefined") usernames="";
        var usernames = usernames.split(",");
        var i = usernames.indexOf(username);

        if(i > -1) {
          usernames.splice(i,1);
        }
        if (usernames.length >= 10){
          usernames.pop();
        }
        usernames = [username].concat(usernames);
        $cookieStore.put("valid_usernames", usernames.join(","));
      }

      if($stateParams.username) {
        $scope.current_user = $stateParams.username;
        $scope.searchUser($scope.current_user);
      }

  }]);


