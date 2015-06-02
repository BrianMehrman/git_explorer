describe('sidbarController', function() {
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
    $controller('sidebarController', {
      $scope: scope,
      "$routeParams":routeParams,
      "$cookieStore": cookieStore,
      "GithubEvents": GithubEvents
    });
  }));


  it('should have a update user list function', function(){
    expect(scope.updateUserList).toEqual(jasmine.any(Function));
  });

});
