(function() {
    'use strict';

    angular.module('stakes-client', ['ngRoute', 'stakes-ng-main', 'templates', 'brandHeaderDirective', 'sideNavDirective'])
        .config(function($routeProvider) {
            // Our default route will be to the dashboard page
            $routeProvider
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

    var data = angular.module('stakes-ng-data', []);

    data.factory('Users', ['$http',
        function($http) {
            return {
                getUsers: function() {
                    return $http({
                        url: 'http://stakes.app:8000/api/users',
                        method: 'GET',
                        headers: {
                            "Accept": "application/json"
                        }
                    }).then(function(result) {
                        return result.data.data;
                    });
                },
                addUser: function(username) {
                    return $http({
                        url: 'http://stakes.app:8000/api/user',
                        method: 'POST',
                        data: {
                            username: username
                        },
                        headers: {
                            "Accept": "application/json"
                        }
                    }).then(function(result) {
                        return result.data.data;
                    });
                }
            };
        }
    ]);

})();
(function() {
    'use strict';

    angular.module('stakes-ng-main', ['ngRoute', 'stakes-ng-data'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/dashboard', {
                    templateUrl: 'main/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .when('/users', {
                    templateUrl: 'main/users.html',
                    controller: 'UsersCtrl'
                });
        })
        .controller('DashboardCtrl', ['$scope',
            function($scope) {}
        ])
        .controller('UsersCtrl', ['$scope', 'Users',
            function($scope, Users) {
                Users.getUsers().then(function(users) {
                    $scope.users = users;
                });

                $scope.addUser = function() {
                    if ($scope.username) {
                        Users.addUser($scope.username).then(function(user) {
                            $scope.users.push(user);
                            $scope.username = '';
                        });
                    }
                };
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
                    title: 'Users'
                }];
                // Used to set the active class on the nav li elements
                $scope.isActive = function(route) {
                    return route === $location.path();
                };
            }
        ]);

})();