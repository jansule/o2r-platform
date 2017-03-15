(function(){
    'use strict';

    angular
        .module('starter.o2rMapTable')
        .controller('O2rMapTableController', O2rMapTable);
    
    O2rMapTable.$inject = ['$scope'];
    function O2rMapTable($scope){
        var vm = this;
        vm.data = $scope.tableData;
    }
})();