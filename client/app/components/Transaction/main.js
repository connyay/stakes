(function() {
    'use strict';

    angular.module('stakes-transaction', ['ngRoute', 'stakes-transaction.controllers'])
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