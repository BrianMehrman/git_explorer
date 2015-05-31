'use strict';

angular.module('mainApp')
  .factory("GithubUsers", ["$resource",function($resource) {

    GithubUser = $resource("https://api.github.com/users/:username?client_id=:clientname&client_secret=:clientsecret", { username: "@username" }, {
      clientname: "brianmehrman",
      clientsecret: "c2250c6115d0357e74648a3c9328d2cf5c2c6f6a",
      query: { method: "GET", isArray: false }
    });

    return GithubUser;

  }]);
