'use strict';
(function(angular){
  angular
    .module('sbx')
    .controller('generalCtrl', ['$scope','alertify','commonSrv', '$state', '$stateParams', 'infoSrv', generalCtrl]);

    function generalCtrl($scope, alertify, commonSrv, $state, $stateParams, infoSrv){
      const obj = this, common = commonSrv, info = infoSrv;

      function init(){
        obj.getInfo();
      }

      /**
       * @return {Array} - Retorna los resultados almacenados en la tabla de 'informacion'
       */
      obj.getInfo = function(){
        info.get(function(data){
          obj.items = data;
        }, function(e){
          alertify.error(e);
        });
      };

      /**
       * @return {message} - Retorna 'OK' si se agrego bien el registro
       */
      obj.save = function(){
        let data = {
          nombre: obj.name,
          cargo: obj.charge
        };

        info.set(data, function(msg){
          alertify.success(msg);
          obj.name = null;
          obj.charge = null;
          obj.getInfo();
        },function(e){alertify.error(e);});
      }

      obj.edit = function(item){
        $state.go('main.edit',{key: item._KEY});
      }

      obj.delete = function(item){
        info.delete(item._KEY, function(message){
          alertify.success('Record borrado');
          obj.getInfo();
        }, function(e){
            alertify.error(e);
        });
      }




      init();

    }

})(angular);