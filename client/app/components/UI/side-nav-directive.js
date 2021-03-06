(function() {
    'use strict';

    angular.module('sideNavDirective', ['brandHeaderDirective'])
        .directive('sideNav', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/UI/side-nav.html',
                controller: 'NavCtrl'
            };
        })
        .controller('NavCtrl', ['$scope', '$location',
            function($scope, $location) {
                // Items to show in the side navigation.
                // Object with a title and route property. If no route
                // is provided the lowercase'd title will be used
                $scope.navItems = [{
                    title: 'Dashboard',
                    route: 'dashboard',
                    icon: 'dashboard',
                }, {
                    title: 'Users',
                    icon: 'users',
                    route: 'users'
                }, {
                    title: 'Accounts',
                    icon: 'money',
                    route: 'accounts'
                }, {
                    title: 'Transactions',
                    icon: 'exchange',
                    route: 'transactions'
                }];
            }
        ]);

})();