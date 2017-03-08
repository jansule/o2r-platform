(function(){
    'use strict';

    angular
        .module('starter.o2rChoroProp')
        .directive('o2rChoroProp', o2rChoroProp);

    o2rChoroProp.$inject = [];
    function o2rChoroProp(){
        return {
            restrict: 'E',
            templateUrl: 'app/o2rChoroProp/o2rChoroProp.template.html',
            controller: 'O2rChoroPropController',
            controllerAs: 'vm',
            scope: {

            },
            link: link
        };

        function link(scope, element, attrs){

        }
    }
})();