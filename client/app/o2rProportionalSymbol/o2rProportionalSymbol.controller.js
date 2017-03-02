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
                $log.debug(response.data);
                console.log(findPolygonCenter.center(response.data));
                angular.extend(vm.layers.baselayers, {
                    shape: {
                        name: 'BaseShape',
                        type: 'geoJSONShape',
                        data: response.data,
                        visible: true,
                        layerOptions: {
                            color: '#000',
                            fillColor: '#000',
                            weight: 2,
                            opacity: 1,
                            fillOpacity: 0
                        }
                    }
                });

                
                angular.extend(vm.layers.overlays, {
                    markers : {
                        name:'Major Cities (Awesome Markers)',
                        type: 'geoJSONShape',
                        data: findPolygonCenter.createMarkers(findPolygonCenter.center(response.data)),
                        visible: true,
                        layerOptions: {
                            pointToLayer: create
                            
                        }
                        
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

        function create(feature, latlng){
            return L.circleMarker(latlng, {
                /*
                type: 'div',
                //iconSize: [50, 20],
                popupAnchor:  [0, 0],
                html: 'Hello World',
                className: 'o2r-leaflet-div-icon'
                */
                radius: 0.1 * (feature.properties[vm.compareVal]),
                fillColor: vm.color,
                color: vm.color,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    }
})();