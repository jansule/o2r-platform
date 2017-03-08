(function(){
    'use strict';

    angular
        .module('starter.o2rMapComparability')
        .factory('rateSingleMap', rateSingleMap);
    
    rateSingleMap.$inject = [];
    function rateSingleMap(){
        var service = {
            rate: rate
        };

        return service;

        //////////

        /**
         * 
         * @param {Object} map Mapobject with structure as defined in PLACE LINK TO STRUCTURE HERE 
         */
        function rate(map){
            /*
            var result = {};
            result.symboltype = _rateSymbol(map.symboltype);
            return result;
            */
        }

        /**
         * 
         * @param {String} symboltype symboltype of map 
         */
        /*
        function _rateSymbol(symboltype){
            if(symboltype == 'circle') return {symboltype: symboltype, result: '+'};
            //if(symboltype == 'stackedSquares') return {symboltype: symboltype, result: '++'};
            return {symboltype: symboltype, result: '0'};
        }

        function _rateLegend(maptype, legend){
            if(maptype == 'proportionalSymbol'){
                
            }
            
        }
        */
    }
})();