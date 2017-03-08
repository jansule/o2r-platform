(function(){
    'use strict';

    angular
        .module('starter.o2rChoroProp')
        .controller('O2rChoroPropController', O2rChoroPropController);
    
    O2rChoroPropController.$inject = ['$scope', '$log', 'findPolygonCenter'];
    function O2rChoroPropController($scope, $log, findPolygonCenter){
        var vm = this;
        vm.choroData        = $scope.choroData;
        vm.choroCompareVal  = $scope.choroCompareVal;
        vm.choroClassify    = $scope.choroClassify;
        vm.choroColors      = $scope.choroColors;
        vm.choroShowLabel   = $scope.choroShowLabel;
        vm.propData         = $scope.propData;
        vm.propCompareVal   = $scope.propCompareVal;
        vm.propColor        = $scope.propColor;
        vm.propShowLabel    = $scope.propShowLabel;

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
                    name: vm.choroCompareVal,
                    type: 'geoJSONShape',
                    data: vm.choroData,
                    visible: true,
                    layerOptions: {
                        style: createChoropleth
                    }
                }
            });
            angular.extend(vm.layers.overlays, {
                "Proportional Symbol": {
                    name: vm.propCompareVal,
                    type: 'group',
                    visible: true,
                    layerOptions: {
                        layers: [
                            {
                                name: 'BaseShape',
                                type: 'geoJSONShape',
                                data: vm.propData,
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
                                name: vm.propCompareVal,
                                type: 'geoJSONShape',
                                data: findPolygonCenter.createMarkers(findPolygonCenter.center(vm.propData)),
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

            var center = turf.center(vm.choroData);
            angular.extend(vm.center, {
                lat: center.geometry.coordinates[1],
                lng: center.geometry.coordinates[0],
                zoom: 8
            });
        }

        function createProportional(feature, latlng){
            return L.circleMarker(latlng, {
                radius: 0.15 * (feature.properties[vm.propCompareVal]),
                fillColor: vm.propColor,
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });
        }

        function createChoropleth(data){
            return {
                fillColor: getColor(data.properties[vm.choroCompareVal]),
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
                if(i <= vm.choroClassify.length && d > vm.choroClassify[i]) i++;
                else noColorSelected = false;
            }
            return vm.choroColors[i];
        }
    }
})();