(function(){
    'use strict';

    angular
        .module('starter.o2rMapHelper')
        .factory('choroplethHelper', choroplethHelper);

    choroplethHelper.$inject = [];
    function choroplethHelper(){
        var service = {
            create: create
        };

        return service;

        //////////

        function create(data, val, classes, colors){
           return {
                fillColor: _getColor(data.properties[val], classes, colors),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 1
            }; 
        }

        function _getColor(d, classes, colors){
            var i = 0;
            var noColorSelected = true;
            while(noColorSelected){

                if(i <= classes.length && d > classes[i]) i++;
                else noColorSelected = false;
                
            }
            return colors[i];
        }
    }
})()