(function() {
    'use strict';
    var templatePath = function(template) {
        return 'components/Account/templates/' + template + '.html';
    };
    angular.module('stakes.account.directives', ['stakes.account.data'])
        .directive('accountOverview', function() {
            return {
                restrict: 'E',
                templateUrl: templatePath('account-overview'),
                scope: {
                    account: '=',
                    link: '='
                }
            };

        })
        .directive('accountQuickCreate', function() {
            return {
                restrict: 'E',
                templateUrl: templatePath('account-quick-create'),
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
        })
        .directive('accountNav', function() {
            return {
                restrict: 'E',
                templateUrl: templatePath('account-nav')
            };
        });
})();