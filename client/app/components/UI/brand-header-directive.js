(function() {
    'use strict';

    angular.module('brandHeaderDirective', [])
        .directive('brandHeader', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/UI/brand-header.html'
            };
        });

})();