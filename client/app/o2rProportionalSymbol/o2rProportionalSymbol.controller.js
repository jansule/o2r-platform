(function(){
    'use strict';

    angular
        .module('starter.o2rProportionalSymbol')
        .controller('O2rProportionalSymbolController', O2rProportionalSymbolController);

    O2rProportionalSymbolController.$inject = ['$scope', '$log', '$http', 'findPolygonCenter'];
    function O2rProportionalSymbolController ($scope, $log, $http, findPolygonCenter){
        var vm = this;
        vm.compareVal = $scope.compareVal;
        vm.classify = $scope.classify;
        vm.color = $scope.color;
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
                baselayers: {/*
                    osm: {
                        name: 'OpenStreetMap',
                        url: 'http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                        type: 'xyz'
                    }*/
                },
                overlays: {}

            }
        });

        activate();

        /////////////

        function activate(){
            $http.get('app/compareMapsView/kreise_hessen.json')
                .then(successCb, errorCb);

            function successCb(response){
                $log.debug(response.data);
                if(!vm.geojson){
                    vm.geojson = createGeoJsonObject(response.data);
                    vm.labelClasses = angular.copy(vm.classify);
                    /*
                    vm.legend = {
                        position: vm.legendPos,
                        colors: vm.colors,
                        labels: vm.labelClasses
                    };
                    */
                    $log.debug(vm.geojson);
                    console.log(findPolygonCenter.center(response.data));
                    //vm.markers = findPolygonCenter.createMarkers(findPolygonCenter.center(response.data), 'GEN');
                            

                    angular.extend(vm.layers.overlays, {
                        shape: {
                            name: 'BaseShape',
                            type: 'geoJSONShape',
                            data: response.data,
                            visible: true,
                            layerOptions: {
                                /*
                                color: '#000',
                                fillColor: '#000',
                                weight: 2,
                                opacity: 1,
                                fillOpacity: 1
                                */
                                style: function(feature){
                                    return {
                                        fillColor: getColor(feature.properties[vm.compareVal]),
                                        weight: 2,
                                        opacity: 1,
                                        color: 'white',
                                        dashArray: '3',
                                        fillOpacity: 1
                                    };
                                }
                            }
                        }
                    });
                }
            }

            function errorCb(response){
                $log.debug('error');
                $log.debug(response);
            }
/*
            $http.get('app/compareMapsView/majorCities.json').then(function(response){
                angular.extend(vm.layers.overlays, {
                        markers : {
                            name:'Major Cities (Awesome Markers)',
                            type: 'geoJSONAwesomeMarker',
                            data: response.data,
                            visible: true,
                            icon: {
                                icon: 'heart',
                                markerColor: 'red',
                                prefix: 'fa'
                            }
                        }
                    });
            }, function(error){
                console.log(error);
            });
*/
        }

        
        var createGeoJsonObject = function (data){
            $log.debug(data);
            return {
                data: data,
                style: create
            };
        };

        function test (o){
             
            return o.properties.GEN === 'Darmstadt'? '#FFF' : '#000';
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