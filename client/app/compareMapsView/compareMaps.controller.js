(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CompareMapsController', CompareMapsController);

    CompareMapsController.$inject = ['$scope', '$log', '$location', '$anchorScroll', 'map1', 'map2', 'o2rMapComparability'];
    function CompareMapsController($scope, $log, $location, $anchorScroll, map1, map2, o2rMapComparability){
        var vm = this;
        /*
        vm.test = 'beschPro';
        vm.test2 = 'betriebe';
        vm.class1 = [40, 50, 70, 90];
        vm.class2 = [10, 25, 50, 100]; 
        vm.colors1 = ['#FFEDA0', '#FC4E2A', '#E31A1C', '#BD0026','#800026'];
        vm.colors2 = ['#f1eef6', '#bdc9e1', '#74a9cf', '#0570b0'];
        //vm.data = data.data;
        */
        vm.map1 = map1.data;
        vm.map2 = map2.data;
        $log.debug(vm.map1);
        $log.debug(vm.map2);
        vm.maps = o2rMapComparability.compare(vm.map2, vm.map2);
        $log.debug(vm.maps);
        vm.checkDisplay = checkDisplay;
        vm.gotoAnchor = gotoAnchor;

        /////////////

        function checkDisplay(map, t1, t2){
            if((map.m1.maptype.type == t1) && (map.m2.maptype.type == t2)) return true;
            return false;
        }

        function gotoAnchor(i){
            var newHash = 'view' + i;
            if($location.hash() !== newHash){
                $location.hash('view' + i);
            } else {
                $anchorScroll();
            }
        }
    }
})();