(function(){
    'use strict';

    angular
        .module('starter.o2rMapHelper')
        .factory('findPolygonCenter', findPolygonCenter);
    
    findPolygonCenter.$inject = [];
    function findPolygonCenter (){
        var service = {
            center: center,
            createMarkers: createMarkers
        };

        return service;

        ////////

        function center (geojson){
            var result = {
                type: 'FeatureCollection',
                features : []
            };
            var feature = geojson.features;
            var centroid;
            //iterate over geojson.features
            console.log(feature[0].geometry.coordinates);
            console.log(feature[4].geometry.coordinates);
            for(var i in feature){
                var feat = {
                    type: 'Feature',
                    properties: feature[i].properties
                }
                centroid = turf.center(feature[i]);
                feat.geometry = centroid.geometry;
                result.features.push(feat);
            }
            console.log(result);
            return result;
        }

        function createMarkers(geojson){
            /*
            var result = {};
            var feature = geojson.features;
            for(var i in feature){
                
                result[i] = {
                    lng: feature[i].geometry.coordinates[1],
                    lat: feature[i].geometry.coordinates[0],
                    icon: {
                        type: 'div',
                        iconSize: [20, 20],
                        popupAnchor:  [0, 0],
                        html: 'Hello World',
                        className: 'o2r-leaflet-div-icon'
                    }
                };
                
            }
            console.log(result);
            return result;
            */
            var result = angular.copy(geojson);
            var feature = result.features;
            for(var i in feature){
                feature[i].icon = {
                        type: 'div',
                        iconSize: [20, 20],
                        popupAnchor:  [0, 0],
                        html: 'Hello World',
                        className: 'o2r-leaflet-div-icon'
                    };
            }
            console.log(result);
            return result;
        }
    }
})();