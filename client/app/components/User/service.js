(function() {
    'use strict';

    var data = angular.module('stakes-user.data', ['ngResource']);

    data.factory('User', ['$resource',
        function($resource) {
            return $resource('/users', {}, {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data) {
                        return angular.fromJson(data).data;
                    }
                },
                'get': {
                    url: '/users/:userId',
                    method: 'GET',
                    transformResponse: function(data) {
                        return angular.fromJson(data).data;
                    }
                },
                'create': {
                    url: '/users',
                    method: 'POST',
                    transformResponse: function(data) {
                        return angular.fromJson(data).data;
                    }
                },
                'update': {
                    url: '/users/:userId',
                    method: 'PUT'
                },
                'delete': {
                    url: '/users/:userId',
                    method: 'DELETE'
                },
            });
        }
    ]);

})();