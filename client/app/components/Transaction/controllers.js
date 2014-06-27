(function() {
    'use strict';

    angular.module('stakes-transaction.controllers', ['stakes-transaction.data'])
        .controller('ListTransactionsCtrl', function($scope, Transaction) {
            Transaction.query({}, function(transactions) {
                $scope.transactions = transactions;
            });
        })
        .controller('ViewTransactionCtrl', function($scope, $routeParams, Transaction) {
            Transaction.get({
                id: $routeParams.id
            }, function(transaction) {
                $scope.transaction = transaction;
            });
        });

})();