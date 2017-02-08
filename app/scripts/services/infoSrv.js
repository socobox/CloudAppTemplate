'use strict';
(function(angular){
  angular
    .module('sbx')
    .factory('infoSrv', ['$cookies', 'alertify', 'commonSrv','$filter', infoSrv]);

    function infoSrv($cookies, alertify, commonSrv, $filter){
      const info = {}, common = commonSrv;

      /**
       * // TODO: listar todos los registros
       * Lista todos los registros en la tabla de informacion
       *
       * @author mauricio@sbx.cloud
       *
       * @param onSuccess {Function} Callback si todo esta bien y retorna sus datos.
       * @param onError {Function} Cllback de error si la transacción falla.
       */
       info.get = function(onSuccess, onError){

          let query = common.queryBuilder()
              .setDomain(common.actual_domain)
              .setModel('informacion')
              .compile();

          common.method.query(common.urls.find, query).then(function(){
            let response = common.response.query.data;

            if(response.success){
              onSuccess(response.results);
            }else{
              onError(response.error);
            }

          });
       };

       /**
       * // TODO: listar un registro especifico
       * Buscar un registro en la tabla de informacion
       *
       * @author mauricio@sbx.cloud
       *
       * @param key {_KEY} campo "_KEY" del registro a editar (identificador unico para cada registro dentro de la plataforma)
       * @param onSuccess {Function} Callback si todo esta bien y retorna sus datos.
       * @param onError {Function} Cllback de error si la transacción falla.
       */
       info.getRegister = function(key, onSuccess, onError){

          let query = common.queryBuilder()
              .setDomain(common.actual_domain)
              .setModel('informacion')
              .whereWithKeys([key])
              .compile();

          common.method.query(common.urls.find, query).then(function(){
            let response = common.response.query.data;

            if(response.success){
              onSuccess(response.results[0]);
            }else{
              onError(response.error);
            }

          });
       };

       /**
       * // TODO: ingresar informacion al sistema - insert en tabla
       * Insertar informacion en la tabla de la BD
       *
       * @author mauricio@sbx.cloud
       *
       * @param data_object {object} objeto con la informacion a ingresar, JSON con la estructura de los campos de la tabla.
       * @param onSuccess {Function} Callback si todo esta bien y retorna sus datos.
       * @param onError {Function} Cllback de error si la transacción falla.
       */

       info.set = function(data_object, onSuccess, onError){

          let query = common.queryBuilder()
              .setDomain(common.actual_domain)
              .setModel('informacion')
              .addObject(data_object)
              .compile();

          common.method.query(common.urls.row, query).then(function(){
            let response = common.response.query.data;

            if(response.success){
              onSuccess('OK');
            }else{
              onError(response.error);
            }
          });

       };

      /**
       * // TODO: editar informacion 
       * Editar informacion de un registro en la BD
       *
       * @author mauricio@sbx.cloud
       *
       * @param data_object {object} objeto con la informacion a ingresar el cual contiene el campo _KEY con su identificador, JSON con la estructura de los campos de la tabla.
       * data_object = {
       *  _KEY:  XXX-XXX-XXX-XXX
       *  nombre: Jhon Doe
       *  cargo: navegador de la matrix
       * }
       * campo "_KEY"(identificador unico para cada registro dentro de la plataforma)
       * @param onSuccess {Function} Callback si todo esta bien y retorna sus datos.
       * @param onError {Function} Cllback de error si la transacción falla.
       */

       info.edit = function(data_object, onSuccess, onError){

          let query = common.queryBuilder()
              .setDomain(common.actual_domain)
              .setModel('informacion')
              .addObject(data_object)
              .compile();

          common.method.query(common.urls.update, query).then(function(){
            let response = common.response.query.data;

            if(response.success){
              onSuccess('OK');
            }else{
              onError(response.error);
            }
          });

       };

       /**
       * // TODO: borrar un registro en la tabla
       * borrar informacion
       *
       * @author mauricio@sbx.cloud
       *
       * @param key {_KEY} campo "_KEY" del registro a editar (identificador unico para cada registro dentro de la plataforma)
       * @param onSuccess {Function} Callback si todo esta bien y retorna sus datos.
       * @param onError {Function} Cllback de error si la transacción falla.
       */

       info.delete = function(key, onSuccess, onError){
          let query = common.queryBuilder()
              .setDomain(common.actual_domain)
              .setModel('informacion')
              .whereWithKeys([key])
              .compile();

          common.method.query(common.urls.delete, query).then(function(){
            let response = common.response.query.data;
            if(response.success){
              onSuccess('OK');
            }else{
              onError(response.error);
            }
          });
       }

      return info;
    } 

})(angular);
