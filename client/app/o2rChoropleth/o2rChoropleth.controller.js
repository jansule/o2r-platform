(function(){
    'use strict';

    angular
        .module('starter.o2rChoropleth')
        .controller('O2rChoroplethController', O2rChoroplethController);

    O2rChoroplethController.$inject = ['$scope', '$log'];
    function O2rChoroplethController($scope, $log){
        var vm = this;
        vm.data = $scope.data;
        vm.compareVal = $scope.compareVal;
        vm.classify = $scope.classify;
        vm.colors = $scope.colors;
        vm.showLabel = $scope.showLabel;
        vm.legendPos = $scope.legendPos;

        $log.debug($scope);
        angular.extend(vm, {
            center: {},
            layers: {
                baselayers: {},
                overlays: {}
            }
        });

        activate();

        /////////////

        function activate(){
            angular.extend(vm.layers.baselayers, {
                shape: {
                    name: vm.compareVal,
                    type: 'geoJSONShape',
                    data: vm.data,
                    visible: true,
                    layerOptions: {
                        style: create
                    }
                }
            });
            vm.labelClasses = angular.copy(vm.classify);
            //vm.labelClasses.push('more');
            var legendlabel = prepareLegend(vm.labelClasses);
            angular.extend(vm, {
                legend: {
                    position: vm.legendPos,
                    colors: vm.colors,
                    labels: legendlabel
                }
            });
            var center = turf.center(vm.data);
            angular.extend(vm.center, {
                lat: center.geometry.coordinates[1],
                lng: center.geometry.coordinates[0],
                zoom: 8
            });
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
                weight: 1,
                opacity: 1,
                color: '#000',
                fillOpacity: 1
            };
        }

        function prepareLegend(classes){
            var result = [];
            for(var i in classes){
                result.push('< ' + classes[i]);
            }
            result.push(classes[classes.length-1] + ' +');
            return result;
        }
    }
})();