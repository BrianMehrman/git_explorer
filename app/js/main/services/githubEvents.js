'use strict';
angular.module('mainApp')
  .factory("GithubEvents", ["$resource",function($resource) {

    var GithubEvents = $resource("https://api.github.com/users/:username/events/public?client_id=:clientname&client_secret=:clientsecret&page=:page", { username: "@username" }, {
      clientname: "brianmehrman",
      page: 1,
      clientsecret: "c2250c6115d0357e74648a3c9328d2cf5c2c6f6a",
      query: { method: "GET", isArray: true, cache: true }
    });

    GithubEvents.prototype.icon_path = function(){
      return this.org ? this.org.avatar_url : "http://placehold.it/120x120&text="+this.type.replace(/(?!^[A-Z])([A-Z])/g," $1");
    }

    return GithubEvents;

  }]);
