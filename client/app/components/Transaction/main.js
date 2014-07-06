(function() {
    'use strict';

    angular.module('stakes.transaction', ['ngRoute', 'stakes.transaction.controllers', 'stakes.transaction.directives'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/transactions', {
                    templateUrl: 'components/Transaction/templates/transactions.html',
                    controller: 'ListTransactionsCtrl'
                })
                .when('/transactions/:id', {
                    templateUrl: 'components/Transaction/templates/transaction.html',
                    controller: 'ViewTransactionCtrl'
                });
        });
})();