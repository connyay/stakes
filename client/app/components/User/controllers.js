(function() {
    'use strict';
    var resetFocus = function() {
        angular.element('[name="username"]').trigger('focus');
    };
    angular.module('stakes.user.controllers', ['stakes.user.data'])
        .controller('ListUsersCtrl', function($scope, User, $timeout) {
            $scope.newUser = new User();
            User.query({}, function(users) {
                $scope.users = users;
            });
            $scope.addUser = function() {
                $scope.newUser.password_confirmation = $scope.newUser.password;
                $scope.newUser.$create({}, function(user) {
                    $scope.users.push(user);
                    $scope.newUser = new User();
                    $timeout(resetFocus, 0, false);
                });
            };
            $scope.deleteUser = function(user) {
                user.$delete().then(function() {
                    $scope.users.splice($scope.users.indexOf(user), 1);
                });
            };

            $scope.refresh = function() {
                User.query({}, function(users) {
                    $scope.users = users;
                });
            };
        })
        .controller('ViewUserCtrl', ['$scope', '$routeParams', 'User',
            function($scope, $routeParams, User) {
                $scope.loading = true;
                User.get({
                    id: $routeParams.id,
                    include: 'account,account.transactions'
                }, function(user) {
                    $scope.loading = false;
                    $scope.user = user;
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
                User.get({
                    id: $routeParams.id
                }, function(user) {
                    $scope.user = user;
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