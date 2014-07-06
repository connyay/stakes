(function() {
    'use strict';

    angular.module('stakes.dashboard.controllers', ['angles'])
        .controller('DashboardCtrl', function($scope) {
            $scope.chart = {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    fillColor: 'rgba(151,187,205,0)',
                    strokeColor: '#92cf5c',
                    pointColor: 'rgba(151,187,205,0)',
                    pointStrokeColor: '#92cf5c',
                    data: [3, 6, 2, 4, 12, 20, 15]
                }],
            };
            $scope.options = {
                segmentShowStroke: false,
                responsive: true,
                tooltipTemplate: '<%= value %> new accounts',
            };
        });

})();