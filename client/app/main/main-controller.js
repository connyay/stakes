(function() {
    'use strict';

    angular.module('stakes-ng-main', ['ngRoute', 'stakes-ng-data'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/dashboard', {
                    templateUrl: 'main/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .when('/users', {
                    templateUrl: 'main/users.html',
                    controller: 'UsersCtrl'
                });
        })
        .controller('DashboardCtrl', ['$scope',
            function($scope) {}
        ])
        .controller('UsersCtrl', ['$scope', 'Users',
            function($scope, Users) {
                Users.getUsers().then(function(data) {
                    $scope.users = data;
                });
            }
        ]);

})();