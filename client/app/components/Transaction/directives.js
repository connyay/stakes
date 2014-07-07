(function() {
    'use strict';
    var templatePath = function(template) {
        return 'components/Transaction/templates/' + template + '.html';
    };
    angular.module('stakes.transaction.directives', [])
        .directive('transactionOverview', function() {
            return {
                restrict: 'E',
                templateUrl: templatePath('transaction-overview'),
                scope: {
                    transaction: '=',
                    link: '='
                }
            };

        });
})();