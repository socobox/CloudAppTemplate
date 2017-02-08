'use strict';
(function(angular){
  angular
    .module('sbx')
    .controller('loginCtrl', ['$scope','$state','alertify','commonSrv','sessionSrv', loginCtrl]);

    function loginCtrl($scope,$state,alertify, commonSrv, sessionSrv){
      const obj = this, common = commonSrv, session = sessionSrv;

      function init(){
        obj.isLoading = false;
       
      }

      obj.getUser = function(){
        let valid = true, msg = '';
        obj.isLoading = true;
        $scope.$broadcast('show-errors-check-validity');
        if (obj.loginForm.$invalid) {
          obj.isLoading = false;
          valid = false;
          alertify.error('There are invalid fields');
          return;
        }

        let form_data = {
          login: obj.user,
          password: obj.pass,
          domain: common.actual_domain
        }
        
        session.login(form_data).then(function(){
          obj.isLoading = false;
          
          if(session.loginStatus){
            common.setUserData(session.user);
            common.setHeaders(session.user.token);
            $state.go('main.general');
          }else{
            alertify.error('Nombre de Usuario o Password incorrecto, intente de nuevo.');
          }
        });
      }

      init();

    }

})(angular);