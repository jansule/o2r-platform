(function(){
    'use strict';

    angular
        .module('starter.o2rChoropleth')
        .directive('o2rChoropleth', o2rChoropleth);

    o2rChoropleth.$inject = [];
    function o2rChoropleth(){
        return {
            restrict: 'E',
            templateUrl: 'app/o2rChoropleth/o2rChoropleth.template.html',
            controller: 'O2rChoroplethController',
            controllerAs: 'vm',
            scope: {
                choroData: '='
            },
            link: link
        };

        function link(scope, iElement, attrs){
        
        }
    }
})();