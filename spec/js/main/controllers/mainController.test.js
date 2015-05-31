describe('mainController', function() {
  beforeEach(angular.mock.module('mainApp'));
  var scope, location, state, $httpBackend;

  var mock_GithubEvents =function(){
    this.query=function(username){}
  }
  var mock_cookieStore = function(){
    this.store = {};
    this.get = function(name){ if(this.store[name]){return this.store[name]} else { return "";}};
    this.put = function(name, value) {  this.store[name] = value;  }
    this.remove = function(name){  if(this.store[name]){  delete this.store[name];  }  }
  }

  beforeEach(angular.mock.inject(function($rootScope, $controller, _$state_, _$httpBackend_){

    var routeParams = {username:""};
    $httpBackend = _$httpBackend_;
    scope  = $rootScope.$new();
    $state = _$state_;

    spyOn($state, 'go');

    $controller('mainController', {
      $scope: scope,
      $state: $state,
      "$routeParams":routeParams,
    });
  }));

  it('should have a search_loading set to false', function(){
    expect(scope.search_loading).toEqual(false);
  });

  describe('$scope.searchUser', function() {
    beforeEach(function(){
      username = "brianmehrman";
      scope.searchUser(username);
    })

    it('should redirect user to graph search', function(){
      expect($state.go).toHaveBeenCalledWith("home.graph", {username: username});
    });

  });
});
