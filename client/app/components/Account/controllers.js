(function() {
    'use strict';

    angular.module('stakes.account.controllers', ['stakes.account.data'])
        .controller('ListAccountsCtrl', function($scope, Account) {
            Account.query({}, function(accounts) {
                $scope.accounts = accounts;
            });
        })
        .controller('ViewAccountCtrl', function($scope, $routeParams, Account) {
            Account.get({
                id: $routeParams.id,
                include: 'transactions,user'
            }, function(account) {
                $scope.account = account;
            });
        })
        .controller('FundAccountCtrl', function($scope, $routeParams, Account) {
            $scope.data = {
                amount: 0
            };
            Account.get({
                id: $routeParams.id,
                include: 'user'
            }, function(account) {
                $scope.account = account;
            });

            $scope.fund = function() {
                var amount = $scope.data.amount;
                $scope.data.amount = 0;
                Account.fund({
                    id: $scope.account.id
                }, {
                    amount: amount
                }, function(account) {
                    $scope.account = account;
                }, function() {
                    $scope.data.amount = amount;
                });
            };
        });

})();