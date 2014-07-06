(function() {
    'use strict';

    angular.module('stakes.admin', ['ngRoute', 'stakes.dashboard.controllers', 'stakes.user', 'stakes.account',
        'stakes.transaction', 'templates', 'loadingDirective', 'sideNavDirective'
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

    angular.module('stakes', ['ngRoute', 'stakes-dashboard.controllers', 'templates', 'brandHeaderDirective'])
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

    angular.module('stakes.account.controllers', ['stakes.account.data'])
        .controller('ListAccountsCtrl', function($scope, Account) {
            Account.query({}, function(accounts) {
                $scope.accounts = accounts;
            });
        })
        .controller('ViewAccountCtrl', function($scope, $routeParams, Account) {
            Account.get({
                id: $routeParams.id,
                include: 'user'
            }, function(account) {
                $scope.account = account;
            });
        });

})();
(function() {
    'use strict';

    angular.module('stakes.account.directives', ['stakes.account.data'])
        .directive('accountOverview', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/Account/templates/account-overview.html',
                scope: {
                    account: '=',
                    link: '='
                }
            };

        })
        .directive('accountQuickCreate', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/Account/templates/account-quick-create.html',
                scope: {
                    user: '='
                },
                controller: function($scope, Account) {

                    $scope.create = function() {
                        Account.create({
                            'user_id': $scope.user.id
                        }, function(account) {
                            $scope.user.account = account;
                        });
                    };
                }
            };
        });
})();
(function() {
    'use strict';

    angular.module('stakes.account', ['ngRoute', 'stakes.account.controllers', 'stakes.account.directives'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/accounts', {
                    templateUrl: 'components/Account/templates/accounts.html',
                    controller: 'ListAccountsCtrl'
                })
                .when('/accounts/:id', {
                    templateUrl: 'components/Account/templates/account.html',
                    controller: 'ViewAccountCtrl'
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
    var data = angular.module('stakes.account.data', ['ngResource']);

    data.factory('Account', ['$resource',
        function($resource) {
            return $resource('/accounts', {
                id: '@id'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: getData
                },
                'get': {
                    url: '/accounts/:id',
                    method: 'GET',
                    transformResponse: function(data) {
                        var account = getData(data);
                        if (account.user) {
                            account.user = getData(account.user);
                        }
                        return account;
                    }
                },
                'create': {
                    url: '/accounts',
                    method: 'POST',
                    transformResponse: function(data) {
                        return getData(data);
                    }
                },
                'delete': {
                    url: '/accounts/:id',
                    method: 'DELETE'
                }
            });
        }
    ]);

})();
(function() {
    'use strict';

    angular.module('stakes.dashboard.controllers', [])
        .controller('DashboardCtrl', function($scope) {});

})();
(function() {
    'use strict';

    angular.module('stakes.transaction.controllers', ['stakes.transaction.data'])
        .controller('ListTransactionsCtrl', function($scope, Transaction) {
            Transaction.query({
                include: 'account'
            }, function(transactions) {
                $scope.transactions = transactions;
            });
        })
        .controller('ViewTransactionCtrl', function($scope, $routeParams, Transaction) {
            Transaction.get({
                id: $routeParams.id,
                include: 'account'
            }, function(transaction) {
                $scope.transaction = transaction;
            });
        });

})();
(function() {
    'use strict';

    angular.module('stakes.transaction.directives', [])
        .directive('transactionOverview', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/Transaction/templates/transaction-overview.html',
                scope: {
                    transaction: '=',
                    link: '='
                }
            };

        });
})();
(function() {
    'use strict';

    angular.module('stakes.transaction', ['ngRoute', 'stakes.transaction.controllers', 'stakes.transaction.directives'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/transactions', {
                    templateUrl: 'components/Transaction/templates/transactions.html',
                    controller: 'ListTransactionsCtrl'
                })
                .when('/transactions/:id', {
                    templateUrl: 'components/Transaction/templates/transaction.html',
                    controller: 'ViewTransactionCtrl'
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
    var data = angular.module('stakes.transaction.data', ['ngResource']);

    data.factory('Transaction', ['$resource',
        function($resource) {
            return $resource('/transactions', {
                id: '@id'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: getData
                },
                'get': {
                    url: '/transactions/:id',
                    method: 'GET',
                    transformResponse: function(data) {
                        var transaction = getData(data);
                        if (transaction.account) {
                            transaction.account = getData(transaction.account);
                        }
                        return transaction;
                    }
                }
            });
        }
    ]);

})();
(function() {
    'use strict';

    angular.module('brandHeaderDirective', [])
        .directive('brandHeader', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/UI/brand-header.html'
            };
        });

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

    angular.module('sideNavDirective', ['brandHeaderDirective'])
        .directive('sideNav', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/UI/side-nav.html',
                controller: 'NavCtrl'
            };
        })
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
                    route: 'users'
                }, {
                    title: 'Accounts',
                    icon: 'money',
                    route: 'accounts'
                }, {
                    title: 'Transactions',
                    icon: 'exchange',
                    route: 'transactions'
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
                $scope.user = User.get({
                    id: $routeParams.id
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

    angular.module('stakes.user.directives', [])
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
                    user: '=',
                    link: '='
                }
            };
        })
        .directive('userNav', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/User/templates/user-nav.html'
            };

        });

})();
(function() {
    'use strict';

    angular.module('stakes.user', ['ngRoute', 'stakes.user.controllers', 'stakes.user.directives'])
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
                .when('/users/:id', {
                    templateUrl: 'components/User/templates/user.html',
                    controller: 'ViewUserCtrl'
                })
                .when('/users/:id/edit', {
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
    var data = angular.module('stakes.user.data', ['ngResource']);

    data.factory('User', ['$resource',
        function($resource) {
            return $resource('/users', {
                id: '@id'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: getData
                },
                'get': {
                    url: '/users/:id',
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
                    url: '/users/:id',
                    method: 'PUT',
                    transformResponse: getData
                },
                'delete': {
                    url: '/users/:id',
                    method: 'DELETE'
                }
            });
        }
    ]);

})();