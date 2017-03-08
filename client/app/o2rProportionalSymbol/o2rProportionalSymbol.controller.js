(function(){
    'use strict';

    angular
        .module('starter.o2rProportionalSymbol')
        .controller('O2rProportionalSymbolController', O2rProportionalSymbolController);

    O2rProportionalSymbolController.$inject = ['$scope', '$log', 'findPolygonCenter'];
    function O2rProportionalSymbolController ($scope, $log, findPolygonCenter){
        var vm = this;
        vm.compareVal = $scope.compareVal;
        vm.color = $scope.color;
        vm.showLabel = $scope.showLabel;
        vm.legendPos = $scope.legendPos;
        vm.data = $scope.data;
        vm.max = 117;
        vm.min = 16;

        $log.debug($scope);
        angular.extend(vm, {
            layers: {
                baselayers: {},
                overlays: {}
            },
            center: {},
            controls: {
                scale: true,
                custom: []
            }
        });

        var MyControl = L.control();
        MyControl.setPosition('bottomleft');
        MyControl.onAdd = function () {
            var className = 'legend'; 
            var container = L.DomUtil.create('div', className);
            var legendTitle = L.DomUtil.create('h5', 'legend-title', container);
            legendTitle.innerHTML = vm.compareVal;

            var legendItem1 = L.DomUtil.create('div', 'legendItem1', container);
            legendItem1.innerHTML = '<div style="height: ' + 0.3 * vm.max + 'px; width: ' + 0.3 * vm.max + 'px; border-radius: 50%; background:'+ vm.color +';"></div>';
            var legendItem2 = L.DomUtil.create('div', 'legendItem2', container);
            legendItem2.innerHTML = '<div style="height: ' + 0.3 * (vm.min + ((vm.max-vm.min)/3 * 2)) + 'px; width: ' + 0.3 * (vm.min + ((vm.max-vm.min)/3 * 2)) + 'px; border-radius: 50%; background:'+ vm.color +';"></div>';
            var legendItem3 = L.DomUtil.create('div', 'legendItem3', container);
            legendItem3.innerHTML = '<div style="height: ' + 0.3 * (vm.min + ((vm.max-vm.min)/3)) + 'px; width: ' + 0.3 * (vm.min + ((vm.max-vm.min)/3)) + 'px; border-radius: 50%; background:'+ vm.color +';"></div>';
            var legendItem4 = L.DomUtil.create('div', 'legendItem4', container);
            legendItem4.innerHTML = '<div style="height: ' + 0.3 * vm.min + 'px; width: ' + 0.3 * vm.min + 'px; border-radius: 50%; background:'+ vm.color +';"></div>';
            
            return container;
        }

        vm.controls.custom.push(MyControl);  
        activate();
  
        /////////////

        function activate(){
            angular.extend(vm.layers.baselayers, {
                "Group Layer": {
                    name: vm.compareVal,
                    type: "group",
                    visible: true,
                    layerOptions: {
                        layers: [
                            {
                                name: 'BaseShape',
                                type: 'geoJSONShape',
                                data: vm.data,
                                visible: true,
                                layerOptions: {
                                    color: '#000',
                                    fillColor: '#000',
                                    weight: 1.5,
                                    opacity: 1,
                                    fillOpacity: 0
                                },
                                layerParams: {}
                            },
                            {
                                name: vm.compareVal,
                                type: 'geoJSONShape',
                                data: findPolygonCenter.createMarkers(findPolygonCenter.center(vm.data)),
                                visible: true,
                                layerOptions: {
                                    pointToLayer: create
                                    
                                },
                                layerParams: {}
                            }
                        ]
                    }
                }
            });
           
            var center = turf.center(vm.data);
            angular.extend(vm.center, {
                lat: center.geometry.coordinates[1],
                lng: center.geometry.coordinates[0],
                zoom: 8
            });
        }

        function create(feature, latlng){
            return L.circleMarker(latlng, {
                radius: 0.15 * (feature.properties[vm.compareVal]),
                fillColor: vm.color,
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });
        }
    }
})();