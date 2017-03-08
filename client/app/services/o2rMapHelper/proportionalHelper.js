(function(){
    'use strict';
    
    angular
        .module('starter.o2rMapHelper')
        .factory('proportionalHelper', proportionalHelper);
    
    proportionalHelper.$inject = [];
    function proportionalHelper(){
        var service = {
            create: create
        };
        
        return service;

        /////////

        function create(feature, latlng, val, color){
            return L.circleMarker(latlng, {
                radius: 0.15 * (feature.properties[val]),
                fillColor: color,
                color: color,
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });
        }
    }
})();