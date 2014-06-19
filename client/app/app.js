(function() {
    'use strict';

    angular.module('stakes', ['ngRoute', 'stakes-dashboard.controllers', 'stakes-user',
        'templates', 'brandHeaderDirective', 'sideNavDirective'
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

})();