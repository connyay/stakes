(function() {
    'use strict';
    var getData = function(obj) {
        if (typeof obj === 'string') {
            obj = angular.fromJson(obj);
        }
        return obj.data;
    };
    var data = angular.module('stakes.user.data', ['ngResource']);

    data.factory('User', ['$resource',
        function($resource) {
            return $resource('/users', {
                id: '@id'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: getData
                },
                'get': {
                    url: '/users/:id',
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
                    transformResponse: getData
                },
                'update': {
                    url: '/users/:id',
                    method: 'PUT',
                    transformResponse: getData
                },
                'delete': {
                    url: '/users/:id',
                    method: 'DELETE'
                }
            });
        }
    ]);

})();