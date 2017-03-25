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
                    name: vm.data.Property.PropertyName,
                    type: 'geoJSONShape',
                    data: vm.data.Raw,
                    visible: true,
                    layerOptions: {
                        style: create
                    }
                }
            });
            vm.labelClasses = angular.copy(vm.data.ThematicType.Classes.Classes);
            //vm.labelClasses.push('more');
            var legendlabel = prepareLegend(vm.labelClasses);
            angular.extend(vm, {
                legend: {
                    position: vm.data.ThematicType.Legend.Postition,
                    colors: vm.data.ThematicType.Fill.Fill,
                    labels: legendlabel
                }
            });
            var center = turf.center(vm.data.Raw);
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

                if(i <= vm.data.ThematicType.Classes.NrOfClasses && d > vm.data.ThematicType.Classes.Classes[i]) i++;
                else noColorSelected = false;
                
            }
            return vm.data.ThematicType.Fill.Fill[i];
        }

        function create(data){
            return {
                fillColor: getColor(data.properties[vm.data.Property.PropertyName]),
                weight: vm.data.ThematicType.Stroke.StrokeWidth,
                opacity: 1,
                color: vm.data.ThematicType.Stroke.Stroke,
                fillOpacity: vm.data.ThematicType.Fill.FillOpacity
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