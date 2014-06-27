(function() {
    'use strict';

    angular.module('stakes-user.directives', [])
        .directive('userForm', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/User/templates/user-form.html',
                scope: {
                    submitText: '@',
                    user: '=',
                    submit: '&'
                }
            };
        })
        .directive('userQuickCreate', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/User/templates/user-quick-create.html',
                scope: {
                    user: '=',
                    submit: '&'
                }
            };
        })
        .directive('userOverview', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/User/templates/user-overview.html',
                scope: {
                    user: '='
                }
            };

        });

})();