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
                compareVal: '=',
                classify: '=',
                colors: '=',
                showLabel: '=',
                legendPos: '='
            },
            link: link
        };

        function link(scope, iElement, attrs){
            console.log(scope);
            if(!attrs.hasOwnProperty('showLabel')){
                scope.showLabel = null;
            }
            if(!attrs.hasOwnProperty('legendPos')){
                scope.legendPos = null;
            }
        }
    }
})();