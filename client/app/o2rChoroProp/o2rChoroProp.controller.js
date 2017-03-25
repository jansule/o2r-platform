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
                    name: vm.choroData.Property.PropertyName,
                    type: 'geoJSONShape',
                    data: vm.choroData.Raw,
                    visible: true,
                    layerOptions: {
                        style: createChoropleth
                    }
                }
            });
            angular.extend(vm.layers.overlays, {
                "Proportional Symbol": {
                    name: vm.propData.Property.PropertyName,
                    type: 'group',
                    visible: true,
                    layerOptions: {
                        layers: [
                            {
                                name: 'BaseShape',
                                type: 'geoJSONShape',
                                data: vm.propData.Raw,
                                visible: true,
                                layerOptions: {
                                    color: vm.propData.ThematicType.Polygon.Stroke.Stroke,
                                    fillColor: vm.propData.ThematicType.Polygon.Fill.Fill,
                                    weight: vm.propData.ThematicType.Polygon.Stroke.StrokeWidth,
                                    opacity: 1,
                                    fillOpacity: vm.propData.ThematicType.Polygon.Fill.FillOpacity
                                },
                                layerParams: {}
                            }, {
                                name: vm.propData.Property.PropertyName,
                                type: 'geoJSONShape',
                                data: findPolygonCenter.createMarkers(findPolygonCenter.center(vm.propData.Raw)),
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

            var center = turf.center(vm.choroData.Raw);
            angular.extend(vm.center, {
                lat: center.geometry.coordinates[1],
                lng: center.geometry.coordinates[0],
                zoom: 8
            });
        }

        function createProportional(feature, latlng){
            return L.circleMarker(latlng, {
                radius: vm.propData.ThematicType.RadialFactor * (feature.properties[vm.propData.Property.PropertyName]),
                fillColor: vm.propData.ThematicType.Fill.Fill,
                color: vm.propData.ThematicType.Stroke.Stroke,
                weight: vm.propData.ThematicType.Stroke.StrokeWidth,
                opacity: 1,
                fillOpacity: vm.propData.ThematicType.Fill.FillOpacity
            });
        }

        function createChoropleth(data){
            return {
                fillColor: getColor(data.properties[vm.choroData.Property.PropertyName]),
                weight: vm.choroData.ThematicType.Stroke.StrokeWidth,
                opacity: 1,
                color: vm.choroData.ThematicType.Stroke.Stroke,
                fillOpacity: vm.choroData.ThematicType.Fill.FillOpacity
            };
        }

        function getColor(d){
            var i = 0;
            var noColorSelected = true;
            while(noColorSelected){
                if(i <= vm.choroData.ThematicType.Classes.NrOfClasses && d > vm.choroData.ThematicType.Classes.Classes[i]) i++;
                else noColorSelected = false;
            }
            return vm.choroData.ThematicType.Fill.Fill[i];
        }
    }
})();