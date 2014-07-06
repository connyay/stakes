(function() {
    'use strict';
    var getData = function(obj) {
        if (typeof obj === 'string') {
            obj = angular.fromJson(obj);
        }
        return obj.data;
    };
    var data = angular.module('stakes.transaction.data', ['ngResource']);

    data.factory('Transaction', ['$resource',
        function($resource) {
            return $resource('/transactions', {
                id: '@id'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: getData
                },
                'get': {
                    url: '/transactions/:id',
                    method: 'GET',
                    transformResponse: function(data) {
                        var transaction = getData(data);
                        if (transaction.account) {
                            transaction.account = getData(transaction.account);
                        }
                        return transaction;
                    }
                }
            });
        }
    ]);

})();