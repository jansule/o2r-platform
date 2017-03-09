(function(){
    'use strict';

    angular
        .module('starter.o2rChoropleth')
        .controller('O2rChoroplethController', O2rChoroplethController);

    O2rChoroplethController.$inject = ['$scope', '$log'];
    function O2rChoroplethController($scope, $log){
        var vm = this;
        vm.data = $scope.choroData;

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
                    name: vm.data['value-to-display'].value,
                    type: 'geoJSONShape',
                    data: vm.data.raw,
                    visible: true,
                    layerOptions: {
                        style: create
                    }
                }
            });
            vm.labelClasses = angular.copy(vm.data.maptype.classes);
            //vm.labelClasses.push('more');
            var legendlabel = prepareLegend(vm.labelClasses);
            angular.extend(vm, {
                legend: {
                    position: vm.data.maptype.legend.position,
                    colors: vm.data.maptype.colors,
                    labels: legendlabel
                }
            });
            var center = turf.center(vm.data.raw);
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

                if(i <= vm.data.maptype['number-of-classes'] && d > vm.data.maptype.classes[i]) i++;
                else noColorSelected = false;
                
            }
            return vm.data.maptype.colors[i];
        }

        function create(data){
            return {
                fillColor: getColor(data.properties[vm.data['value-to-display'].value]),
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
            console.log(result);
            return result;
        }
    }
})();