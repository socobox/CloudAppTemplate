'use strict';
(function(angular){
  angular
    .module('sbx')
    .factory('commonSrv', ['$http','$cookies','alertify', commonSrv]);

    function commonSrv($http,$cookies,alertify){
      const common = {maps:{}};
      
      common.actual_domain = 148;
      common.app_key='9458a46b-c7f0-4156-aceb-184070e4d0c3';
      common.urls = {
        api: 'https://sbxcloud.com/api',
        login: '/user/v1/login',
        row: '/data/v1/row',
        find: '/data/v1/row/find',
        update: '/data/v1/row/update',
        delete: '/data/v1/row/delete',
      };

      common.toMap = function (array, mapName, key) {
        if (!common.maps[mapName]) {
          common.maps[mapName] = {};
        }

        for (let i = 0; i < array.length; i++) {
          common.maps[mapName][array[i][key]] = array[i];
        }
        return common.maps[mapName];
      };

      common.setUserData = function (data) {
        $cookies.putObject('sbx_user', data);
      };

      common.getUserData = function () {
        return common.userData = $cookies.getObject('sbx_user');
      };

      common.setHeaders = function (token) {

        common.headers = {
          'Authorization': 'Bearer ' + token,
          'App-Key': common.app_key
        };
      };

      common.getHeaders = function () {
        return common.headers
      };

      common.response = {};

      common.method = {
        get: function (urlRequest, params) {

          return $http({
            method: 'GET',
            url: common.urls.api + urlRequest,
            params: params,
            headers: common.getHeaders()
          }).then(function (response) {

            common.response.get = response;
          });
        },
        post: function (urlRequest, params) {
          return $http({
            method: 'POST',
            url: common.urls.api + urlRequest,
            params: params,
            headers: common.getHeaders()
          }).then(function (response) {
            common.response.post = response;
          });
        },
        query: function (urlRequest, send_query) {

          return $http({
            method: 'POST',
            url: common.urls.api + urlRequest,
            data: send_query,
            headers: common.getHeaders()
          }).then(function (response) {

            common.response.query = response;
          });
        }
      }


    common.queryBuilder = function () {

      let q = {page: 1, size: 1000, where: []};

      let group = {
        'ANDOR': 'AND',
        'GROUP': []
      };

      return {
        setDomain: function (domainId) {
          q.domain = domainId;
          return this;
        },
        setModel: function (modelName) {
          q.row_model = modelName;
          return this;
        },
        setPage: function (page) {
          q.page = page;
          return this;
        },
        setPageSize: function (pageSize) {
          q.size = pageSize;
          return this;
        },
        fetchModels: function (arrayOfModelNames) {
          q.fetch = arrayOfModelNames;
          return this;
        },

        addObjectArray: function (array) {

          // prevent non array items to be addded.
          if (Array && !Array.isArray(array)) {
            return;
          }


          q.where = null;

          if (!q.rows) {
            q.rows = [];
          }

          q.rows = q.rows.concat(array);
          return this;
        },
        addObject: function (object) {
          q.where = null;

          if (!q.rows) {
            q.rows = [];
          }

          q.rows.push(object);
          return this;
        },
        whereWithKeys: function (keysArray) {
          q.where = {keys: keysArray};
          return this;
        },
        newGroup: function (connectorANDorOR) {

          q.rows = null;

          // override array where
          if (!Array.isArray(q.where)) {
            q.where = [];
          }

          q.where.push(group);

          group = {
            'ANDOR': connectorANDorOR,
            'GROUP': []
          };

          return this;
        },
        addCondition: function (connectorANDorOR, fieldName, operator, value) {
          // override array where
          if (!Array.isArray(q.where)) {
            q.where = [];
          }

          // first connector is ALWAYS AND
          if (group.GROUP.length < 1) {
            connectorANDorOR = 'AND';
          }

          // allow only letters and '.' in the fields.
          if (/^[a-zA-Z0-9\._-]+$/.test(fieldName) == false) {
            throw new Error('Invalid FIELD NAME: ' + fieldName)
          }

          // check if the user is using valid operators.
          if (!(operator == 'is' || operator == 'is not' || operator == '!=' || operator == '=' || operator == '<' ||operator == '<=' || operator == '>=' || operator == '>' || operator == 'LIKE')) {
            throw new Error('Invalid operator: ' + operator)
          }

          if (value === undefined) {
            throw new Error('Invalid value: ' + value);
          }

          group.GROUP.push({
            'ANDOR': connectorANDorOR,
            'FIELD': fieldName,
            'OP': operator,
            'VAL': value
          });

          return this;
        },
        compile: function () {

          if (q.where) {
            delete q.rows;

            if (Array.isArray(q.where) && group.GROUP.length > 0) {
              q.where.push(group);
            }
          } else if (q.rows) {
            delete q.where;
          }



          return q;
        }
      }

    };


      return common;
    } //end of common

})(angular);
