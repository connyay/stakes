(function() {
    'use strict';

    angular.module('stakes.account', ['ngRoute', 'stakes.account.controllers', 'stakes.account.directives'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/accounts', {
                    templateUrl: 'components/Account/templates/accounts.html',
                    controller: 'ListAccountsCtrl'
                })
                .when('/accounts/:id', {
                    templateUrl: 'components/Account/templates/account.html',
                    controller: 'ViewAccountCtrl'
                })
                .when('/accounts/:id/fund', {
                    templateUrl: 'components/Account/templates/fund-account.html',
                    controller: 'FundAccountCtrl'
                });
        });
})();