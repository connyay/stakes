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
                },
                controller: function($scope) {
                    $scope.isDisabled = function() {
                        if (!$scope.user || !$scope.user.username || !$scope.user.password || !$scope.user.password_confirmation) {
                            return true;
                        }
                        if ($scope.user.password !== $scope.user.password_confirmation) {
                            return true;
                        }
                        return false;
                    }
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
                },
                controller: function($scope) {
                    $scope.isDisabled = function() {
                        if (!$scope.user || !$scope.user.username || !$scope.user.password) {
                            return true;
                        }
                        return false;
                    }
                }
            };
        });

})();