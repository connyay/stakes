(function() {
    'use strict';
    var getData = function(obj) {
        if (typeof obj === 'string') {
            obj = angular.fromJson(obj);
        }
        return obj.data;
    };
    var data = angular.module('stakes.account.data', ['ngResource']);

    data.factory('Account', ['$resource',
        function($resource) {
            return $resource('/accounts', {
                id: '@id'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: getData
                },
                'get': {
                    url: '/accounts/:id',
                    method: 'GET',
                    transformResponse: function(data) {
                        var account = getData(data);
                        if (account.user) {
                            account.user = getData(account.user);
                        }
                        if (account.transactions) {
                            account.transactions = getData(account.transactions);
                        }
                        return account;
                    }
                },
                'create': {
                    url: '/accounts',
                    method: 'POST',
                    transformResponse: function(data) {
                        return getData(data);
                    }
                },
                'fund': {
                    url: '/accounts/:id/fund',
                    method: 'PUT',
                    transformResponse: function(data) {
                        return getData(data);
                    }
                },
                'delete': {
                    url: '/accounts/:id',
                    method: 'DELETE'
                }
            });
        }
    ]);

})();