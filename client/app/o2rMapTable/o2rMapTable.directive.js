(function(){
    'use strict';

    angular
        .module('starter.o2rMapTable')
        .directive('o2rMapTable', o2rMapTable);
    
    o2rMapTable.$inject = [];
    function o2rMapTable(){
        return {
            restrict: 'E',
            templateUrl: 'app/o2rMapTable/o2rMapTable.template.html',
            controller: 'O2rMapTableController',
            controllerAs: 'vm',
            scope: {
                tableData: '='
            },
            link: link
        };
        function link(scope, element, attrs){

        }
    }
})();