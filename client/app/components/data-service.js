(function() {
    'use strict';

    var data = angular.module('stakes-ng-data', []);

    data.factory('Users', ['$http',
        function($http) {
            return {
                getUsers: function() {
                    return $http({
                        url: 'http://stakes.app:8000/api/users',
                        method: 'GET',
                        headers: {
                            "Accept": "application/json"
                        }
                    }).then(function(result) {
                        return result.data.data;
                    });
                },
                addUser: function(username) {
                    return $http({
                        url: 'http://stakes.app:8000/api/user',
                        method: 'POST',
                        data: {
                            username: username
                        },
                        headers: {
                            "Accept": "application/json"
                        }
                    }).then(function(result) {
                        return result.data.data;
                    });
                }
            };
        }
    ]);

})();