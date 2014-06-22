(function() {
    'use strict';

    angular.module('stakes-user.controllers', ['stakes-user.data'])
        .controller('ListUsersCtrl', function($scope, User) {
            $scope.inFlight = true;
            $scope.newUser = new User();
            $scope.users = User.query({}, function() {
                $scope.inFlight = false;
            });
            $scope.addUser = function(evt) {
                if ($scope.newUser.username && $scope.newUser.password) {
                    $scope.newUser.password_confirmation = $scope.newUser.password;
                    $scope.newUser.save().then(function(user) {
                        $scope.users.push(user);
                        $scope.newUser = new User();
                        evt.target.getElementsByTagName('input').username.focus();
                    });
                }
            };
            $scope.deleteUser = function(user) {
                user.$delete().then(function() {
                    $scope.users.splice($scope.users.indexOf(user), 1);
                });
            };
        })
        .controller('ViewUserCtrl', ['$scope', '$routeParams', 'User',
            function($scope, $routeParams, User) {

                $scope.user = User.get({
                    userId: $routeParams.userId,
                    include: 'account,account.transactions'
                });
            }
        ])
        .controller('NewUserCtrl', ['$scope', 'User', '$location',
            function($scope, User, $location) {
                $scope.user = {};
                $scope.createUser = function() {
                    User.create($scope.user, function(user) {
                        $location.path('/users/' + user.id);
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
                    $scope.user.$update().then(function() {
                        $location.path('/users/' + $scope.user.id);
                    });
                };
            }
        ]);

})();