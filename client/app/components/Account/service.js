(function() {
    'use strict';
    var getData = function(obj) {
        if (typeof obj === 'string') {
            obj = angular.fromJson(obj);
        }
        return obj.data;
    };
    var data = angular.module('stakes-account.data', ['ngResource']);

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
                        return account;
                    }
                },
            });
        }
    ]);

})();