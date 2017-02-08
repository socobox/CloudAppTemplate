'use strict';
(function(angular){
  angular
    .module('sbx')
    .controller('navCtrl', ['$scope','alertify', 'sessionSrv', 'commonSrv', navCtrl]);

    function navCtrl($scope, alertify, sessionSrv, commonSrv){
      const nav = this, session=sessionSrv, common = commonSrv;

      function init(){
        nav.validateSession();  
      }


      nav.validateSession = function(){
        if(session.validate()){
          nav.user = common.getUserData();
          common.setHeaders(common.getUserData().token);
        }
      }

      nav.logout = function(){
        session.logout();
      }

      init();

    }

})(angular);