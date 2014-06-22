(function() {
    'use strict';

    angular.module('stakes-admin', ['ngRoute', 'stakes-dashboard.controllers', 'stakes-user', 'stakes-account',
        'templates', 'loadingDirective', 'sideNavDirective'
    ])
        .config(function($routeProvider) {
            $routeProvider
                .when('/dashboard', {
                    templateUrl: 'components/Dashboard/templates/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .otherwise({
                    redirectTo: '/dashboard'
                });
        });

    angular.module('stakes', ['ngRoute', 'stakes-dashboard.controllers', 'templates', 'brandHeaderDirective'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/dashboard', {
                    templateUrl: 'components/Dashboard/templates/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .otherwise({
                    redirectTo: '/dashboard'
                });
        });
})();