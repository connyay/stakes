(function() {
    'use strict';

    var data = angular.module('stakes-ng-data', []);

    data.factory('Users', ['$http',
        function($http) {
            return {
                getUsers: function() {
                    return $http({
                        url: 'http://stakes.app:8000/api/users',
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