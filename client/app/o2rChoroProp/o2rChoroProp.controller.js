(function(){
    'use strict';

    angular
        .module('starter.o2rChoroProp')
        .controller('O2rChoroPropController', O2rChoroPropController);
    
    O2rChoroPropController.$inject = ['$scope', '$log', '$timeout', 'findPolygonCenter'];
    function O2rChoroPropController($scope, $log, $timeout, findPolygonCenter){
        var vm = this;
        vm.choroData = $scope.choroData;
        vm.propData = $scope.propData;

        angular.extend(vm, {
            center: {},
            layers: {
                baselayers: {},
                overlays: {},
                layerOptions: {
                    autoZIndex: true
                }
            }
        });

        activate();

        ///////////

        function activate(){
            angular.extend(vm.layers.overlays, {
                "Choropleth": {
                    name: vm.choroData['value-to-display'].value,
                    type: 'geoJSONShape',
                    data: vm.choroData.raw,
                    visible: true,
                    layerOptions: {
                        style: createChoropleth
                    }
                }
            });
            angular.extend(vm.layers.overlays, {
                "Proportional Symbol": {
                    name: vm.propData['value-to-display'].value,
                    type: 'group',
                    visible: true,
                    layerOptions: {
                        layers: [
                            {
                                name: 'BaseShape',
                                type: 'geoJSONShape',
                                data: vm.propData.raw,
                                visible: true,
                                layerOptions: {
                                    color: '#000',
                                    fillColor: '#000',
                                    weight: 1,
                                    opacity: 1,
                                    fillOpacity: 0
                                },
                                layerParams: {}
                            }, {
                                name: vm.propData['value-to-display'].value,
                                type: 'geoJSONShape',
                                data: findPolygonCenter.createMarkers(findPolygonCenter.center(vm.propData.raw)),
                                visible: true,
                                layerOptions: {
                                    pointToLayer: createProportional
                                },
                                layerParams: {}
                            }
                        ]
                    }
                }
            });

            var center = turf.center(vm.choroData.raw);
            angular.extend(vm.center, {
                lat: center.geometry.coordinates[1],
                lng: center.geometry.coordinates[0],
                zoom: 8
            });
        }

        function createProportional(feature, latlng){
            return L.circleMarker(latlng, {
                radius: 0.15 * (feature.properties[vm.propData['value-to-display'].value]),
                fillColor: vm.propData.maptype.color,
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });
        }

        function createChoropleth(data){
            return {
                fillColor: getColor(data.properties[vm.choroData['value-to-display'].value]),
                weight: 1,
                opacity: 1,
                color: '#000',
                fillOpacity: 1
            };
        }

        function getColor(d){
            var i = 0;
            var noColorSelected = true;
            while(noColorSelected){
                if(i <= vm.choroData.maptype['number-of-classes'] && d > vm.choroData.maptype.classes[i]) i++;
                else noColorSelected = false;
            }
            return vm.choroData.maptype.colors[i];
        }
    }
})();