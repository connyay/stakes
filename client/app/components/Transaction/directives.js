(function() {
    'use strict';

    angular.module('stakes-transaction.directives', [])
        .directive('transactionOverview', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/Transaction/templates/transaction-overview.html',
                scope: {
                    transaction: '='
                }
            };

        });
})();