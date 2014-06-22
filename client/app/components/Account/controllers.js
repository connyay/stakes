(function() {
    'use strict';

    angular.module('stakes-account.controllers', ['stakes-account.data'])
        .controller('ListAccountsCtrl', function($scope, Account) {
            Account.query({}, function(accounts) {
                $scope.accounts = accounts;
            });
        })
        .controller('ViewAccountCtrl', function($scope, $routeParams, Account) {
            Account.get({
                id: $routeParams.id,
                include: 'user'
            }, function(account) {
                $scope.account = account;
            });
        });

})();