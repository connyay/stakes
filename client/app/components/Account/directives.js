(function() {
    'use strict';

    angular.module('stakes-account.directives', [])
        .directive('accountOverview', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/Account/templates/account-overview.html',
                scope: {
                    account: '='
                },
                controller: function($scope) {}
            };

        });
})();