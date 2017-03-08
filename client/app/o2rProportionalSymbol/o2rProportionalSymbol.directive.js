(function(){
    'use strict';

    angular
        .module('starter.o2rProportionalSymbol')
        .directive('o2rProportionalSymbol', o2rProportionalSymbol);

    o2rProportionalSymbol.$inject = [];
    function o2rProportionalSymbol(){
        return {
            restrict: 'E',
            templateUrl: 'app/o2rProportionalSymbol/o2rProportionalSymbol.template.html',
            controller: 'O2rProportionalSymbolController',
            controllerAs: 'vm',
            scope: {
                compareVal: '=',
                classify: '=',
                color: '=',
                colors: '=',
                showLabel: '=',
                legendPos: '=',
                data: '='
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