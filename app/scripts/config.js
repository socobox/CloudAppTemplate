'use strict';
(function(angular){
  angular
    .module('sbx')
    .config(['$stateProvider', '$urlRouterProvider', Appconfig]);

    function Appconfig($stateProvider, $urlRouterProvider){
       $urlRouterProvider
        .otherwise('/');

      $stateProvider
        .state('login', {
          url: '/',
          templateUrl: 'views/login.html',
          controller: 'loginCtrl',
          controllerAs: 'obj'
        })
        .state('main', {
          url: '/app',
          templateUrl: 'views/layout.html',
          controller: 'navCtrl',
          controllerAs: 'nav'
        })
        .state('main.general', {
          url: '/general',
          templateUrl: 'views/general.html',
          controller: 'generalCtrl',
          controllerAs: 'obj'
        })
        .state('main.edit', {
          url: '/edit/:key',
          templateUrl: 'views/edit.html',
          controller: 'editCtrl',
          controllerAs: 'obj'
        })
        .state('main.detail', {
          url: '/detail/:key',
          templateUrl: 'views/detail.html',
          controller: 'detailCtrl',
          controllerAs: 'obj'
        })
        ;
    }
})(angular);