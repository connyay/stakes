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
        });

})();