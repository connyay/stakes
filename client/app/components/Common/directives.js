(function() {
    'use strict';
    var defaultActiveClass = 'active';

    angular.module('stakes.common.directives', [])
        .directive('isActive', ['$location',
            function($location) {
                return {
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        var activeClass = attrs.activeClass || defaultActiveClass;

                        var path = attrs.route || (attrs.href || attrs.ngHref).substr(1);
                        $scope.location = $location;
                        $scope.$watch('location.path()', function(newPath) {
                            element.toggleClass(activeClass, (path === newPath));
                        });
                    }
                };
            }
        ])
        .directive('autofocus', function($timeout) {
            return {
                restrict: 'A',
                link: function($scope, $element, attrs) {
                    //debugger;
                    $timeout(function() {
                        $element[0].focus();
                    });
                }
            };
        });
})();