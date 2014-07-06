(function() {
    'use strict';

    angular.module('stakes.user', ['ngRoute', 'stakes.user.controllers', 'stakes.user.directives'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/users', {
                    templateUrl: 'components/User/templates/users.html',
                    controller: 'ListUsersCtrl'
                })
                .when('/users/new', {
                    templateUrl: 'components/User/templates/user-create.html',
                    controller: 'NewUserCtrl'
                })
                .when('/users/:id', {
                    templateUrl: 'components/User/templates/user.html',
                    controller: 'ViewUserCtrl'
                })
                .when('/users/:id/edit', {
                    templateUrl: 'components/User/templates/user-edit.html',
                    controller: 'EditUserCtrl'
                });
        });

})();