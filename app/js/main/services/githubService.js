'use strict';
angular.module('mainApp')
  .factory("GithubService", ["$resource","$q","$cookieStore","GithubEvents",function($resource, $q, $cookieStore, GithubEvents) {

    function GithubService ($scope) {
        this.$scope = $scope;
        this.$scope.search_message = "";
        console.log(this.$scope.search_message);
        this.$scope.events=undefined;
        this.$scope.search_loading=false;
        this.$scope.error_msg=undefined;
    }

    GithubService.prototype.getEventPage = function(name,page){
      var deferred = $q.defer();

      GithubEvents.query({username: name, page: page}, function(d){
        deferred.resolve(d);
      }, function(errorResult) {
        deferred.reject(errorResult);
      });
      return deferred.promise;
    }

    GithubService.prototype.searchUser = function(user_name) {
        console.log(this.$scope);

      // this.$scope.search_message = "searching for " + user_name;
      this.$scope.events=undefined;
      this.$scope.search_loading=true;
      this.$scope.error_msg=undefined;
      var pages = [];

      for(var i=0;i<1;i++){ pages.push(this.$scope.getEventPage(user_name,i+1));}

      $q.all(pages).then(function(data_sets){
        var d = [].concat.apply([],data_sets);
        addUserSearch(user_name);
        this.$scope.events=d;
        this.$scope.search_loading=false;
        this.$scope.chartData = getEventTypeData(d);
      }, function(errorResult) {
        // do something on error
        this.$scope.search_loading=false;
        if(errorResult.status === 404) {
          this.$scope.error_msg="Sorry that user is not found.";
        }
      });
    }

    GithubService.prototype.getEventTypeData = function(events){
      var types={},
          out = [];
      for(var i=0;i<events.length; i++){
        var e = events[i];
        var time = e["created_at"];
        var type = e["type"];
        types[type] ? types[type]+=1 : types[type] = 1;
      }
      for(t in types){out.push({name:t, amount:types[t]});}
      return out;
    }

    GithubService.prototype.addUserSearch = function(username){
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


    return GithubService;

  }]);
