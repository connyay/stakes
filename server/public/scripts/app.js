(function() {
    'use strict';

    angular.module('stakes', ['ngRoute', 'stakes-dashboard.controllers', 'stakes-user',
        'templates', 'brandHeaderDirective', 'sideNavDirective'
    ])
        .config(function($routeProvider) {
            $routeProvider
                .when('/dashboard', {
                    templateUrl: 'components/Dashboard/templates/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .otherwise({
                    redirectTo: '/dashboard'
                });
        });

})();
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
(function() {
    'use strict';

    angular.module('stakes-dashboard.controllers', [])
        .controller('DashboardCtrl', function($scope) {});

})();
(function() {
    'use strict';

    angular.module('stakes-user.controllers', ['stakes-user.data'])
        .controller('ListUsersCtrl', function($scope, User) {
            $scope.users = User.query();
            $scope.addUser = function(evt) {
                if ($scope.newUser.username && $scope.newUser.password) {
                    User.create($scope.newUser, function(user) {
                        $scope.users.push(user);
                        $scope.newUser = {};
                        evt.target.getElementsByTagName('input').username.focus();
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
(function() {
    'use strict';

    angular.module('stakes-user', ['ngRoute', 'stakes-user.controllers'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/users', {
                    templateUrl: 'components/User/templates/users.html',
                    controller: 'ListUsersCtrl'
                })
                .when('/users/:userId', {
                    templateUrl: 'components/User/templates/user.html',
                    controller: 'ViewUserCtrl'
                })
                .when('/users/:userId/edit', {
                    templateUrl: 'components/User/templates/user-edit.html',
                    controller: 'EditUserCtrl'
                })
                .when('/users/:userId/new', {
                    templateUrl: 'components/User/templates/user-create.html',
                    controller: 'NewUserCtrl'
                });
        });

})();
(function() {
    'use strict';

    var data = angular.module('stakes-user.data', ['ngResource']);

    data.factory('User', ['$resource',
        function($resource) {
            return $resource('/users', {}, {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data) {
                        return angular.fromJson(data).data;
                    }
                },
                'get': {
                    url: '/users/:userId',
                    method: 'GET',
                    transformResponse: function(data) {
                        return angular.fromJson(data).data;
                    }
                },
                'create': {
                    url: '/users',
                    method: 'POST',
                    transformResponse: function(data) {
                        return angular.fromJson(data).data;
                    }
                },
                'update': {
                    url: '/users/:userId',
                    method: 'PUT'
                },
                'delete': {
                    url: '/users/:userId',
                    method: 'DELETE'
                },
            });
        }
    ]);

})();
(function() {
    'use strict';

    angular.module('sideNavDirective', [])
    /*
     * <side-nav> Directive.
     * Builds the left navigation from a list of navItems
     */
    .directive('sideNav', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/nav/side-nav.html',
            controller: 'NavCtrl'
        };
    })
    /*
     * Navigation Controller
     * Uses the navItem array to build a list of navigation.
     * Provides an isActive filter to determine if the provided route is active
     */
    .controller('NavCtrl', ['$scope', '$location',
        function($scope, $location) {
            // Items to show in the side navigation.
            // Object with a title and route property. If no route
            // is provided the lowercase'd title will be used
            $scope.navItems = [{
                title: 'Dashboard',
            }, {
                title: 'Users',
                subitems: [{
                    title: 'All',
                    route: ''
                }, {
                    title: 'New',
                    route: '/new'
                }]
            }];
            // Used to set the active class on the nav li elements
            $scope.isActive = function(route) {
                return route === $location.path();
            };
        }
    ]);

})();