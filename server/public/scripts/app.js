(function() {
    'use strict';

    angular.module('stakes', ['ngRoute', 'stakes-dashboard.controllers', 'stakes-user', 'stakes-account',
        'templates', 'loadingDirective', 'sideNavDirective'
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

    angular.module('stakes-account.directives', [])
        .directive('accountOverview', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/Account/templates/account-overview.html',
                scope: {
                    account: '='
                },
                controller: function($scope) {}
            };

        });
})();
(function() {
    'use strict';

    angular.module('stakes-account', ['stakes-account.directives']);

})();
(function() {
    'use strict';

    angular.module('stakes-dashboard.controllers', [])
        .controller('DashboardCtrl', function($scope) {});

})();
(function() {
    'use strict';

    angular.module('loadingDirective', [])
        .directive('loading', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/UI/loading.html'
            };
        });

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
            templateUrl: 'components/UI/side-nav.html',
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
                route: 'dashboard',
                icon: 'dashboard',
            }, {
                title: 'Users',
                icon: 'users',
                route: 'users',
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
(function() {
    'use strict';
    var resetFocus = function() {
        angular.element('[name="username"]').trigger('focus');
    };
    angular.module('stakes-user.controllers', ['stakes-user.data'])
        .controller('ListUsersCtrl', function($scope, User, $timeout) {
            $scope.inFlight = true;
            $scope.newUser = new User();
            $scope.users = User.query({}, function() {
                $scope.inFlight = false;
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
        });

})();
(function() {
    'use strict';

    angular.module('stakes-user', ['ngRoute', 'stakes-user.controllers', 'stakes-user.directives'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/users', {
                    templateUrl: 'components/User/templates/users.html',
                    controller: 'ListUsersCtrl'
                })
                .when('/users/new', {
                    templateUrl: 'components/User/templates/user-create.html',
                    controller: 'NewUserCtrl'
                })
                .when('/users/:userId', {
                    templateUrl: 'components/User/templates/user.html',
                    controller: 'ViewUserCtrl'
                })
                .when('/users/:userId/edit', {
                    templateUrl: 'components/User/templates/user-edit.html',
                    controller: 'EditUserCtrl'
                });
        });

})();
(function() {
    'use strict';
    var getData = function(obj) {
        if (typeof obj === 'string') {
            obj = angular.fromJson(obj);
        }
        return obj.data;
    };
    var data = angular.module('stakes-user.data', ['ngResource']);

    data.factory('User', ['$resource',
        function($resource) {
            return $resource('/users', {
                userId: '@id'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: getData
                },
                'get': {
                    url: '/users/:userId',
                    method: 'GET',
                    transformResponse: function(data) {
                        var user = getData(data);
                        if (user.account) {
                            user.account = getData(user.account);
                            if (user.account.transactions) {
                                user.account.transactions = getData(user.account.transactions);
                            }
                        }
                        return user;
                    }
                },
                'create': {
                    url: '/users',
                    method: 'POST',
                    transformResponse: getData
                },
                'update': {
                    url: '/users/:userId',
                    method: 'PUT',
                    transformResponse: getData
                },
                'delete': {
                    url: '/users/:userId',
                    method: 'DELETE'
                },
            });
        }
    ]);

})();