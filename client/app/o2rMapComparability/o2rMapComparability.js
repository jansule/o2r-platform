(function(){
    'use strict';

    angular
        .module('starter.o2rMapComparability')
        .factory('o2rMapComparability', o2rMapComparability);
    
    o2rMapComparability.$inject = [];
    function o2rMapComparability(){
        var service = {
            calculate: calculate
        };

        return service;

        /////////////////

        function calculate(map1, map2){
            /*
            var result = {};
            result.maptype = _rateMaptype(map1.maptype, map2.maptype);
            result.symboltype = {};
            result.symboltype.map1 = _ratePropSymbol(map1.maptype, map1.symboltype);
            result.symboltype.map2 = _ratePropSymbol(map2.maptype, map2.symboltype);
            return result;
            */
        }

        /**
         * 
         * @param {String} type1 Maptype of first map  
         * @param {String} type2 Maptype of second map
         */
        /*
        function _rateMaptype(type1, type2){
            if(type1 == 'choropleth' && type2 == 'choropleth') return {type1: type1, type2: type2, result: '++'};
            if((type1 == 'choropleth' && type2 == 'proportionalSymbol')||
                (type1 == 'proportionalSymbol' && type2 == 'choropleth')) return {type1: type1, type2: type2, result: '+'};
            if(type1 == 'proportionalSymbol' && type2 == 'proportionalSymbol') return {type1: type1, type2: type2, result: '--'};
            return {type1: type1, type2: type2, result: '0'};
        }

        /**
         * 
         * @param {String} symboltype Symboltype of map
         */
        /*
        function _rateSingleSymbol(symboltype){
            if(symboltype == 'circle') return {result: '+'};
            if(symboltype == 'stackedSquare') return {result: '++'};
            return {result: '0', symboltype: symboltype};
        }

        function _rateSymbol(maptype1, symboltype1, maptype2, symboltype2){
            /*
            if(maptype1 == 'choropleth' && maptype2 == 'choropleth'){
                return {};
            }
            if((maptype1 == 'choropleth' && maptype2 == 'proportionalSymbol') ||
                (maptype1 == 'proportionalSymbol' && maptype2 == 'choropleth')){

            }
            if(maptype1 == 'proportionalSymbol' && maptype2 == 'proportionalSymbol'){

            }
            */
            /*
            var map1 = _rateSingleSymbol(symboltype1);
            var map2 = _rateSingleSymbol(symboltype2);
            if(map1.result && )
        }
        */
    }
})();