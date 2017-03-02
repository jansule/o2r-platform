(function(){
    'use strict';

    angular
        .module('starter.o2rProportionalSymbol')
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
            var minLat, minLng, maxLat, maxLng;
            //iterate over geojson.features
            console.log(feature[0].geometry.coordinates);
            console.log(feature[4].geometry.coordinates);
            for(var i in feature){
                minLat = Infinity;
                minLng = Infinity;
                maxLat = -Infinity;
                maxLng = -Infinity;
                var feat = {
                    type: 'Feature',
                    properties: feature[i].properties,
                    geometry: {
                        type: 'Point',
                        coordinates: []
                    }
                }
                if(feature[i].geometry.type === 'Polygon'){
                    for(var j in feature[i].geometry.coordinates[0]){
                        if(feature[i].geometry.coordinates[0][j][0] < minLng) minLng = feature[i].geometry.coordinates[0][j][0];
                        if(feature[i].geometry.coordinates[0][j][0] > maxLng) maxLng = feature[i].geometry.coordinates[0][j][0];
                        if(feature[i].geometry.coordinates[0][j][1] < minLat) minLat = feature[i].geometry.coordinates[0][j][1];
                        if(feature[i].geometry.coordinates[0][j][1] > maxLat) maxLat = feature[i].geometry.coordinates[0][j][1];
                    }
                } else if (feature[i].geometry.type === 'MultiPolygon'){
                    for(var j in feature[i].geometry.coordinates[0][0]){
                        if(feature[i].geometry.coordinates[0][0][j][0] < minLng) minLng = feature[i].geometry.coordinates[0][0][j][0];
                        if(feature[i].geometry.coordinates[0][0][j][0] > maxLng) maxLng = feature[i].geometry.coordinates[0][0][j][0];
                        if(feature[i].geometry.coordinates[0][0][j][1] < minLat) minLat = feature[i].geometry.coordinates[0][0][j][1];
                        if(feature[i].geometry.coordinates[0][0][j][1] > maxLat) maxLat = feature[i].geometry.coordinates[0][0][j][1];
                    }
                }
                feat.geometry.coordinates[0] = minLat + ((minLat - maxLat)/2);
                feat.geometry.coordinates[1] = minLng + ((minLng - maxLng)/2);
                result.features.push(feat);
            }
            console.log(result);
            return result;
        }

        function createMarkers(geojson, prop){
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
        }
    }
})();