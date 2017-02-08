'use strict';
(function(angular){
  angular
    .module('sbx')
    .controller('detailCtrl', ['$scope','alertify','commonSrv', '$state', '$stateParams', detailCtrl]);

    function detailCtrl($scope, alertify, commonSrv, $state, $stateParams){
      const obj = this, common = commonSrv;

      function init(){
        
      }



      init();

    }

})(angular);