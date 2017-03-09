(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CompareMapsController', CompareMapsController);

    CompareMapsController.$inject = ['$scope', '$log', 'map1', 'map2', 'o2rMapComparability'];
    function CompareMapsController($scope, $log, map1, map2, o2rMapComparability){
        var vm = this;
        vm.test = 'beschPro';
        vm.test2 = 'betriebe';
        vm.class1 = [40, 50, 70, 90];
        vm.class2 = [10, 25, 50, 100]; 
        vm.colors1 = ['#FFEDA0', '#FC4E2A', '#E31A1C', '#BD0026','#800026'];
        vm.colors2 = ['#f1eef6', '#bdc9e1', '#74a9cf', '#0570b0'];
        //vm.data = data.data;

        vm.map1 = map1.data;
        vm.map2 = map2.data;
        $log.debug(vm.map1);
        $log.debug(vm.map2);
        $log.debug(o2rMapComparability.compare(vm.map1, vm.map2));

    }
})();