(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CompareMapsController', CompareMapsController);

    CompareMapsController.$inject = ['$http', 'data'];
    function CompareMapsController($http, data){
        var vm = this;
        vm.test = 'beschPro';
        vm.test2 = 'betriebe';
        vm.class1 = [40, 50, 70, 90];
        vm.class2 = [10, 25, 50, 100]; 
        vm.colors1 = ['#FFEDA0', '#FC4E2A', '#E31A1C', '#BD0026','#800026'];
        vm.colors2 = ['#f1eef6', '#bdc9e1', '#74a9cf', '#0570b0'];
        vm.data = data.data;
    }
})();