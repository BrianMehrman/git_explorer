describe('lineChartController', function() {
  beforeEach(angular.mock.module('mainApp'));
  var scope, $httpBackend;

  var mock_GithubEvents =function(){
    this.query=function(username){}
  }
  var mock_cookieStore = function(){
    this.store = {};
    this.get = function(name){ if(this.store[name]){return this.store[name]} else { return "";}};
    this.put = function(name, value) {  this.store[name] = value;  }
    this.remove = function(name){  if(this.store[name]){  delete this.store[name];  }  }
  }

  beforeEach(angular.mock.inject(function($q, $rootScope, $controller, _$httpBackend_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    var GithubEvents = new mock_GithubEvents();
    var cookieStore = new mock_cookieStore();

    var routeParams = {username:"brianmehrman"};
    $httpBackend = _$httpBackend_;
    scope  = $rootScope.$new();
    $controller('lineChartController', {
      $scope: scope,
      $q: $q,
      "$routeParams":routeParams,
      "$cookieStore": cookieStore,
      "GithubEvents": GithubEvents
    });
  }));

  it('should have a search_loading set to false', function(){
    expect(scope.search_loading).toEqual(false);
  });

  it('should have a searchUser function', function(){
    expect(scope.searchUser).toEqual(jasmine.any(Function));
  });

  it('should have a addUserSearch function', function(){
    expect(scope.addUserSearch).toEqual(jasmine.any(Function));
  });

  describe('$scope.searchUser', function() {
    beforeEach(function(){
      username = "brianmehrman";
      scope.searchUser(username);
    })

   it('sets the search_loading to true', function(){
      expect(scope.search_loading).toEqual(true);
    });

    it('should set the search message', function() {
      expect(scope.search_message).toEqual('searching for brianmehrman');
    });

    // it gets a user event data from github

    // it creates a chart
  });
});
