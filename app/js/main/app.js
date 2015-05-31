'use strict';

angular.module('d3', []);
angular.module('mainApp.directives', ['d3']);

angular
  .module('mainApp', [
    'ngResource',
    'ngCookies',
    'ui.router',
    'mainApp.directives'
  ])
.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    // home page
    .state('home', {
      url: '/',
      templateUrl : 'js/main/templates/home.html',
      controller  : 'mainController'
    }).state('graph', {
      url: '/graph/:username',
      templateUrl : 'js/main/templates/graph.html',
      controller  : 'graphController'
    }).state('bar', {
      url: '/bar/:username',
      templateUrl : 'js/main/templates/barChart.html',
      controller  : 'barChartController'
    }).state('line', {
      url: '/line/:username',
      templateUrl : 'js/main/templates/lineChart.html',
      controller  : 'lineChartController'
    }).state('list',{
      url: '/list/:username',
      templateUrl :  'js/main/templates/list.html',
      controller  : 'listController'
    });

});



