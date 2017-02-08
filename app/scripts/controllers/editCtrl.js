'use strict';
(function(angular){
  angular
    .module('sbx')
    .controller('editCtrl', ['$scope','alertify','commonSrv', '$state', '$stateParams','infoSrv', editCtrl]);

    function editCtrl($scope, alertify, commonSrv, $state, $stateParams, infoSrv){
      const obj = this, common = commonSrv, info = infoSrv;

      function init(){
        obj.key = $stateParams.key;
        obj.getInfo(obj.key);
      }

      obj.getInfo = function(key){
        info.getRegister(key, function(data){
          obj.name = data.nombre;
          obj.charge = data.cargo;

        }, function(e){
          alertify.error(e);
        });
      };

      obj.edit = function(){
        let data = {
          _KEY: obj.key,
          nombre: obj.name,
          cargo: obj.charge
        }
        
        info.edit(data, function(msg){
          
          alertify.success('Registro editado')
          $state.go('main.general');
        }, function(e){
          alertify.error(e);
        });

      };



      init();

    }

})(angular);