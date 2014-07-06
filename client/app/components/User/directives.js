(function() {
    'use strict';
    var templatePath = function(template) {
        return 'components/User/templates/' + template + '.html';
    };
    angular.module('stakes.user.directives', [])
        .directive('userForm', function() {
            return {
                restrict: 'E',
                templateUrl: templatePath('user-form'),
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
                templateUrl: templatePath('user-quick-create'),
                scope: {
                    user: '=',
                    submit: '&'
                }
            };
        })
        .directive('userOverview', function() {
            return {
                restrict: 'E',
                templateUrl: templatePath('user-overview'),
                scope: {
                    user: '=',
                    link: '='
                }
            };
        })
        .directive('userNav', function() {
            return {
                restrict: 'E',
                templateUrl: templatePath('user-nav')
            };
        });

})();