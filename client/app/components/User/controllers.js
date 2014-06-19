(function() {
    'use strict';

    angular.module('stakes-user.controllers', ['stakes-user.data'])
        .controller('ListUsersCtrl', function($scope, User) {
            $scope.users = User.query();
            $scope.addUser = function() {
                if ($scope.newUser.username && $scope.newUser.password) {
                    User.create($scope.newUser, function(user) {
                        $scope.users.push(user);
                        $scope.newUser = {};
                    });
                }
            };
            $scope.deleteUser = function(user) {
                if (confirm('Are you sure you want to delete ' + user.username + '?')) {
                    User.delete({
                        userId: user.id
                    }, function() {
                        $scope.users.splice($scope.users.indexOf(user), 1);
                    });
                }
            };
        })
        .controller('ViewUserCtrl', ['$scope', '$routeParams', 'User',
            function($scope, $routeParams, User) {

                $scope.user = User.get({
                    userId: $routeParams.userId
                });

                $scope.editUser = function(user) {
                    User.deleteUser(user).then(function() {
                        $scope.users.splice($scope.users.indexOf(user), 1);
                    });
                };
                $scope.deleteUser = function(user) {
                    User.deleteUser(user).then(function() {
                        $scope.users.splice($scope.users.indexOf(user), 1);
                    });
                };
            }
        ])
        .controller('EditUserCtrl', ['$scope', '$routeParams', 'User', '$location',
            function($scope, $routeParams, User, $location) {
                $scope.user = User.get({
                    userId: $routeParams.userId
                });

                $scope.save = function() {
                    var changingPasswords = $scope.newPassword && $scope.confirmNewPassword && $scope.newPassword === $scope.confirmNewPassword;
                    if (changingPasswords) {
                        // Changing password
                        $scope.user.password = $scope.newPassword;
                    }
                    User.update({
                        userId: $routeParams.userId
                    }, $scope.user, function() {
                        $location.path('/users/' + $scope.user.id);
                    });
                };
            }
        ]);

})();