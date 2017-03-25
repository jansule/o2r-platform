(function(){
    'use strict';

    angular
        .module('starter.o2rProportionalSymbol')
        .controller('O2rProportionalSymbolController', O2rProportionalSymbolController);

    O2rProportionalSymbolController.$inject = ['$scope', '$log', 'findPolygonCenter'];
    function O2rProportionalSymbolController ($scope, $log, findPolygonCenter){
        var vm = this;
        vm.data = $scope.propData;

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
        MyControl.setPosition(vm.data.ThematicType.Legend.Position);
        MyControl.onAdd = function () {
            var className = 'legend'; 
            var container = L.DomUtil.create('div', className);
            var legendTitle = L.DomUtil.create('h5', 'legend-title', container);
            legendTitle.innerHTML = vm.data.ThematicType.Legend.Title;

            var legendItem1 = L.DomUtil.create('div', 'legendItem1', container);
            legendItem1.innerHTML = '<div style="height: ' + 0.3 * vm.data.Property.Max + 'px; width: ' + 0.3 * vm.data.Property.Max + 'px; border-radius: 50%; background:'+ vm.data.ThematicType.Fill.Fill +';"></div>';
            var legendItem2 = L.DomUtil.create('div', 'legendItem2', container);
            legendItem2.innerHTML = '<div style="height: ' + 0.3 * (vm.data.Property.Min + ((vm.data.Property.Max-vm.data.Property.Min)/3 * 2)) + 'px; width: ' + 0.3 * (vm.data.Property.Min + ((vm.data.Property.Max-vm.data.Property.Min)/3 * 2)) + 'px; border-radius: 50%; background:'+ vm.data.ThematicType.Fill.Fill +';"></div>';
            var legendItem3 = L.DomUtil.create('div', 'legendItem3', container);
            legendItem3.innerHTML = '<div style="height: ' + 0.3 * (vm.data.Property.Min + ((vm.data.Property.Max-vm.data.Property.Min)/3)) + 'px; width: ' + 0.3 * (vm.data.Property.Min + ((vm.data.Property.Max-vm.data.Property.Min)/3)) + 'px; border-radius: 50%; background:'+ vm.data.ThematicType.Fill.Fill +';"></div>';
            var legendItem4 = L.DomUtil.create('div', 'legendItem4', container);
            legendItem4.innerHTML = '<div style="height: ' + 0.3 * vm.data.Property.Min + 'px; width: ' + 0.3 * vm.data.Property.Min + 'px; border-radius: 50%; background:'+ vm.data.ThematicType.Fill.Fill +';"></div>';
            
            return container;
        }

        vm.controls.custom.push(MyControl);  
        activate();
  
        /////////////

        function activate(){
            angular.extend(vm.layers.baselayers, {
                "Group Layer": {
                    name: vm.data.Property.PropertyName,
                    type: "group",
                    visible: true,
                    layerOptions: {
                        layers: [
                            {
                                name: 'BaseShape',
                                type: 'geoJSONShape',
                                data: vm.data.Raw,
                                visible: true,
                                layerOptions: {
                                    color: vm.data.ThematicType.Polygon.Stroke.Stroke,
                                    fillColor: vm.data.ThematicType.Polygon.Fill.Fill,
                                    weight: vm.data.ThematicType.Polygon.Stroke.StrokeWidth,
                                    opacity: 1,
                                    fillOpacity: vm.data.ThematicType.Polygon.Fill.FillOpacity
                                },
                                layerParams: {}
                            },
                            {
                                name: vm.data.Property.PropertyName,
                                type: 'geoJSONShape',
                                data: findPolygonCenter.createMarkers(findPolygonCenter.center(vm.data.Raw)),
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
           
            var center = turf.center(vm.data.Raw);
            angular.extend(vm.center, {
                lat: center.geometry.coordinates[1],
                lng: center.geometry.coordinates[0],
                zoom: 8
            });
        }

        function create(feature, latlng){
            return L.circleMarker(latlng, {
                radius: 0.15 * (feature.properties[vm.data.Property.PropertyName]),
                fillColor: vm.data.ThematicType.Fill.Fill,
                color: vm.data.ThematicType.Stroke.Stroke,
                weight: vm.data.ThematicType.Stroke.StrokeWidth,
                opacity: 1,
                fillOpacity: vm.data.ThematicType.Fill.FillOpacity
            });
        }
    }
})();