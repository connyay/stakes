(function() {
    'use strict';

    angular.module('stakes.account.directives', ['stakes.account.data'])
        .directive('accountOverview', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/Account/templates/account-overview.html',
                scope: {
                    account: '=',
                    link: '='
                }
            };

        })
        .directive('accountQuickCreate', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/Account/templates/account-quick-create.html',
                scope: {
                    user: '='
                },
                controller: function($scope, Account) {

                    $scope.create = function() {
                        Account.create({
                            'user_id': $scope.user.id
                        }, function(account) {
                            $scope.user.account = account;
                        });
                    };
                }
            };
        });
})();