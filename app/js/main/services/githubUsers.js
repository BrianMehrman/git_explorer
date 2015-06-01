'use strict';

angular.module('mainApp')
  .factory("GithubUsers", ["$resource",function($resource) {

    GithubUser = $resource("https://api.github.com/users/:username", { username: "@username" }, {
      clientname: "brianmehrman",
      query: { method: "GET", isArray: false }
    });

    return GithubUser;

  }]);
