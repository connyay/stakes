(function() {
    'use strict';
    var getData = function(obj) {
        if (typeof obj === 'string') {
            obj = angular.fromJson(obj);
        }
        return obj.data;
    };
    var serialize = function(data) {
        debugger;
        if (typeof data.isAdmin !== 'undefined') {
            data.super_user = data.isAdmin;
            delete data.isAdmin;
        }
        return JSON.stringify(data);
    };
    var data = angular.module('stakes-user.data', ['ngResource']);

    data.factory('User', ['$resource',
        function($resource) {
            return $resource('/users', {
                userId: '@id'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: getData
                },
                'get': {
                    url: '/users/:userId',
                    method: 'GET',
                    transformResponse: function(data) {
                        var user = getData(data);
                        if (user.account) {
                            user.account = getData(user.account);
                            if (user.account.transactions) {
                                user.account.transactions = getData(user.account.transactions);
                            }
                        }
                        return user;
                    }
                },
                'create': {
                    url: '/users',
                    method: 'POST',
                    transformResponse: getData,
                    transformRequest: serialize
                },
                'update': {
                    url: '/users/:userId',
                    method: 'PUT',
                    transformResponse: getData,
                    transformRequest: serialize
                },
                'delete': {
                    url: '/users/:userId',
                    method: 'DELETE'
                },
            });
        }
    ]);

})();