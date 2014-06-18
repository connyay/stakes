(function() {
    'use strict';

    angular.module('brandHeaderDirective', [])
    /*
     * <brand-header> Directive.
     * Not a whole lot of functionality right now. But the login/logout & help can be wired up here.
     */
    .directive('brandHeader', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/brand-header.html',
            controller: function($scope) {
                $scope.toggle = function() {
                    //If window is small enough, enable sidebar push menu
                    if ($(window).width() <= 992) {
                        $('.row-offcanvas').toggleClass('active');
                        $('.left-side').removeClass("collapse-left");
                        $(".right-side").removeClass("strech");
                        $('.row-offcanvas').toggleClass("relative");
                    } else {
                        //Else, enable content streching
                        $('.left-side').toggleClass("collapse-left");
                        $(".right-side").toggleClass("strech");
                    }
                };
                $scope.doLogout = function() {
                    // Super helpful alert
                    alert('Logout');
                };
                $scope.doHelp = function() {
                    // Super helpful alert
                    alert('Help');
                };
            },
        };
    });

})();