'use strict';
(function(angular){

  angular
    .module('sbx')
    .factory('sessionSrv', ['$http', '$state', 'commonSrv', '$cookies', '$rootScope', sessionSrv]);

    function sessionSrv($http, $state, commonSrv, $cookies, $rootScope){
      const session = {}, common = commonSrv;

      session.user = {};

      session.isLogged = function(){
        return  session.user;
      }

      session.validate = function(){
        
        let user = $cookies.getObject('sbx_user');
        if(typeof(user) != 'undefined'){
            return true;
        }else{
          session.logout();
        }
      }

      session.login = function(form_data){

         return $http.get(common.urls.api + common.urls.login, {params : form_data})
         .then(function(response){

            session.loginStatus = response.data.success;
            if(session.loginStatus){
              let user = response.data.user;
              delete user.member_of;
              //$rootScope.$emit('login'); to notify some function or process about login
              session.user = {
                token: response.data.token,
                data: user
              }

            }


         });
      }

     
      session.logout = function(){
        $http.defaults.headers.common['Authorization'] = 'xxxxx';
        $cookies.remove('sbx_user', { path: '/' });
        $state.go('login');

      }


      return session;
    }

})(angular);
