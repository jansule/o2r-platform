(function(){
    'use strict';

    angular
        .module('starter.o2rChoropleth')
        .controller('O2rChoroplethController', O2rChoroplethController);

    O2rChoroplethController.$inject = ['$scope', '$log', '$http', 'leafletMapEvents'];
    function O2rChoroplethController($scope, $log, $http, leafletMapEvents){
        var vm = this;
        vm.compareVal = $scope.compareVal;
        vm.classify = $scope.classify;
        vm.colors = $scope.colors;
        vm.showLabel = $scope.showLabel;
        vm.legendPos = $scope.legendPos;

        $log.debug($scope);
        angular.extend(vm, {
            center: {
                lat:50.950641,
                lng: 10.239258,
                zoom: 8
            },
            layers: {
                baselayers: {},
                overlays: {}
            }
        });

        activate();

        /////////////

        function activate(){
            $http.get('app/compareMapsView/kreise_hessen.json')
                .then(successCb, errorCb);

            function successCb(response){
                angular.extend(vm.layers.baselayers, {
                    shape: {
                        name: 'BaseShape',
                        type: 'geoJSONShape',
                        data: response.data,
                        visible: true,
                        layerOptions: {
                           style: create
                        }
                    }
                });
                vm.labelClasses = angular.copy(vm.classify);
                vm.labelClasses.push('more');
                angular.extend(vm, {
                    legend: {
                        position: vm.legendPos,
                        colors: vm.colors,
                        labels: vm.labelClasses
                    }
                });
            }

            function errorCb(response){
                $log.debug('error');
                $log.debug(response);
            }
        }

        function getColor(d){
            var i = 0;
            var noColorSelected = true;
            while(noColorSelected){

                if(i <= vm.classify.length && d > vm.classify[i]) i++;
                else noColorSelected = false;
                
            }
            return vm.colors[i];
        }

        function create(data){
            return {
                fillColor: getColor(data.properties[vm.compareVal]),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 1
            };
        }

        
    }
})();