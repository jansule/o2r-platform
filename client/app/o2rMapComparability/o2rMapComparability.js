(function(){
    'use strict';

    angular
        .module('starter.o2rMapComparability')
        .factory('o2rMapComparability', o2rMapComparability);
    
    o2rMapComparability.$inject = [];
    function o2rMapComparability(){
        var service = {
            compare: compare
        };

        var choroplethDummy = {
            'value-to-display': {
                'value': null,
                'data-type': null,
                'scale-of-measurement': null
            },
            'additional-info': {
                label: {
                    displayed: null,
                    'data-type': null,
                    'display-value': null
                },
                table: {
                    displayed: null,
                    'displayed-value': []
                }
            },
            raw: {},
            maptype: {
                type: 'choropleth',
                'number-of-classes': null,
                colors: [],
                classes: [],
                legend: {
                    'display-min': null,
                    'display-max': null,
                    title: null,
                    position: null
                }
            }
        };
        var proportionalSymbolDummy = {
            'value-to-display': {
                'value': null,
                'data-type': null,
                'scale-of-measurement': null
            },
            'additional-info': {
                label: {
                    displayed: null,
                    'data-type': null,
                    'display-value': null
                },
                table: {
                    displayed: null,
                    'displayed-value': []
                }
            },
            raw: {},
            maptype: {
                type: 'proportionalSymbol',
                color: null,
                symboltype: null,
                legend: {
                    'number-of-symbols': null,
                    'display-max-size': null,
                    'display-min-size': null,
                    'display-max': null,
                    'display-min': null,
                    title: null
                }
            }
        };

        return service;

        /////////////////

        function compare(m1, m2){
            var result = [];
            var original = {};
            original.m1 = m1;
            original.m2 = m2;
            result.push(original);
            if((m1.maptype.type == 'choropleth' && m2.maptype.type == 'proportionalSymbol') || (m1.maptype.type == 'proportionalSymbol' && m2.maptype.type == 'choropleth')){
                var first = {};
                first.m1 = _rateAndImprove(m1, false);
                first.m2 = _rateAndImprove(m2, false);
                result.push(first);
                if((m1.maptype.type == 'choropleth') && (_checkScaleType('choropleth', m2['value-to-display']['scale-of-measurement']) == true)){
                    var second = {};
                    second.m1 = _rateAndImprove(m1, false);
                    second.m2 = _transformAndImprove(m2, 'choropleth', false);
                    result.push(second);
                } else if((m2.maptype.type == 'choropleth') && (_checkScaleType('choropleth', m1['value-to-display']['scale-of-measurement']) == true)){
                    second.m1 = _transformAndImprove(m1, 'choropleth', false);
                    second.m2 = _rateAndImprove(m2, false);
                    result.push(second);
                }
            }
            if(m1.maptype.type == 'choropleth' && m2.maptype.type == 'choropleth'){
                var first = {};
                first.m1 = _rateAndImprove(m1, false);
                first.m2 = _rateAndImprove(m2, false);
                result.push(first);

                var canTransFst = _checkScaleType('proportionalSymbol', m1['value-to-display']['scale-of-measurement']);
                var canTransSnd = _checkScaleType('proportionalSymbol', m2['value-to-display']['scale-of-measurement']);
                if(canTransFst){
                    var second = {};
                    second.m1 = _transformAndImprove(m1, 'proportionalSymbol', false);
                    second.m2 = _rateAndImprove(m2, false);
                    result.push(second);
                    if(canTransSnd){
                        var third = {};
                        third.m1 = _rateAndImprove(m1, false);
                        third.m2 = _transformAndImprove(m2, 'proportionalSymbol', false);
                        result.push(third);
                    }
                }
                if(canTransSnd && !canTransFst){
                    var second = {};
                    second.m1 = _rateAndImprove(m1, false);
                    second.m2 = _transformAndImprove(m2, 'proportionalSymbol', false);
                    result.push(second);
                }
            }
            if(m1.maptype.type == 'proportionalSymbol' && m2.maptype.type == 'proportionalSymbol'){
                var first = {};
                first.m1 = _rateAndImprove(m1, false);
                first.m2 = _rateAndImprove(m2, false);
                result.push(first);

                var canTransFst = _checkScaleType('choropleth', m1['value-to-display']['scale-of-measurement']);
                var canTransSnd = _checkScaleType('choropleth', m2['value-to-display']['scale-of-measurement']);

                if(canTransFst){
                    var second = {};
                    second.m1 = _transformAndImprove(m1, 'choropleth', false);
                    second.m2 = _rateAndImprove(m2, false);
                    result.push(second);
                    if(canTransSnd){
                        var third = {};
                        third.m1 = _rateAndImprove(m1, false);
                        third.m2 = _transformAndImprove(m2, 'choropleth', false);
                        result.push(third);

                        var fourth = {};
                        fourth.m1 = _transformAndImprove(m1, 'choropleth', false);
                        fourth.m2 = _transformAndImprove(m2, 'choropleth', false);
                        result.push(fourth);
                    }
                }
                if(canTransSnd && !canTransFst){
                    var second = {};
                    second.m1 = _rateAndImprove(m1, false);
                    second.m2 = _transformAndImprove(m2, 'choropleth', false);
                    result.push(second);
                }
            }
            return result;
        }

        function _rateAndImprove(map, showlabel){
            var result = angular.copy(map);
            if(map.maptype.type == 'proportionalSymbol'){
                if(map.maptype.legend['display-min-size'] = false) result.maptype.legend['display-min-size'] = true;
                if(map.maptype.legend['display-max-size'] = false) result.maptype.legend['display-max-size'] = true;
                if(map.maptype.symboltype == 'other') result.maptype.symboltype == 'circle';
            }
            if(map['additional-info'].table.displayed == false){
                result['additional-info'].table.displayed = true;
                result['additional-info'].table['displayed-value'].push(result['value-to-display'].value);
            }
            if(map['additional-info'].label.displayed == false){
                result['additional-info'].label.displayed = showlabel;
                result['additional-info'].label['display-value'] = result['value-to-display'].value;
            }
            if(map.maptype.legend['display-min'] == false) result.maptype.legend['display-min'] = true;
            if(map.maptype.legend['display-max'] == false) result.maptype.legend['display-max'] = true;
            return result;
        }

        function _transformAndImprove(map, maptype, showlabel){
            var result;
            if(maptype == 'choropleth') {
                result = angular.copy(choroplethDummy);
                result['value-to-display'].value = map['value-to-display'].value;
                result['value-to-display']['data-type'] = map['value-to-display']['data-type'];
                result['value-to-display']['scale-of-measurement'] = map['value-to-display']['scale-of-measurement'];
                
                result['additional-info'].label.displayed = showlabel;
                result['additional-info'].label['data-type'] = map['additional-info'].label['data-type'] || map['value-to-display']['data-type'];
                result['additional-info'].label['display-value'] = map['additional-info'].label['display-value'] || map['value-to-display'].value;

                result['additional-info'].table.displayed = true;
                if(map['additional-info'].table['displayed-value'].length != 0){
                    for(var i in map['additional-info'].table['displayed-value']){
                        result['additional-info'].table['displayed-value'].push(map['additional-info'].table['displayed-value'][i]);
                    }
                } else {
                    result['additional-info'].table['displayed-value'].push(map['value-to-display'].value);
                }

                result.maptype.type = 'choropleth';
                result.maptype['number-of-classes'] = 5;
                result.maptype.colors = _getColorRange(map.maptype.color, result.maptype['number-of-classes']);
                result.maptype.classes = _createClasses(map['value-to-display'].max.value, 5, map['value-to-display']['scale-of-measurement']);
                result.maptype.legend['display-min'] = true;
                result.maptype.legend['display-max'] = true;
                result.maptype.legend.title = map.maptype.legend.title;
                result.maptype.legend.position = map.maptype.legend.position;

                result.raw = map.raw;
            }
            if(maptype == 'proportionalSymbol'){
                result = angular.copy(proportionalSymbolDummy);
                result['value-to-display'].value = map['value-to-display'].value;
                result['value-to-display']['data-type'] = map['value-to-display']['data-type'];
                result['value-to-display']['scale-of-measurement'] = map['value-to-display']['scale-of-measurement'];
                
                result['additional-info'].label.displayed = showlabel;
                result['additional-info'].label['data-type'] = map['additional-info'].label['data-type'] || map['value-to-display']['data-type'];
                result['additional-info'].label['display-value'] = map['additional-info'].label['display-value'] || map['value-to-display'].value;

                result['additional-info'].table.displayed = true;
                if(map['additional-info'].table['displayed-value'].length != 0){
                    for(var i in map['additional-info'].table['displayed-value']){
                        result['additional-info'].table['displayed-value'].push(map['additional-info'].table['displayed-value'][i]);
                    }
                } else {
                    result['additional-info'].table['displayed-value'].push(map['value-to-display'].value);
                }

                result.maptype.type = 'proportionalSymbol';
                result.maptype.color = _getMiddleColor(map.maptype.colors);
                result.maptype.symboltype = 'circle';
                result.maptype.legend['number-of-symbols'] = 4;
                result.maptype.legend['display-max-size'] = true;
                result.maptype.legend['display-min-size'] = true;
                result.maptype.legend['display-max'] = true;
                result.maptype.legend['display-min'] = true;
                result.maptype.legend.title = map.maptype.legend.title;
                result.maptype.legend.position = map.maptype.legend.position;

                result.raw = map.raw;
            } 
            return result;
        }




        function _getColorRange(color, classes){
            /*TODO
                rewrite function so that colors will be calculated depending on color value
            */
            var result;
            if(classes == 4) result = ['#f1eef6', '#bdc9e1', '#74a9cf', '#0570b0'];
            if(classes == 5) result = ['#FFEDA0', '#FC4E2A', '#E31A1C', '#BD0026','#800026'];
            return result;
        }

        function _getMiddleColor(colors){
            var result = colors[Math.floor(colors.length/2)];
            return result;
        }

        function _createClasses(max, classes, scale){
            var result = [];
            var interval = max/classes;
            for(var i=1; i<=classes; i++){
                if(scale == 'numerical'){
                    result.push(Math.ceil(interval * i));
                } else {
                    result.push(interval * i);
                }
            }
            return result;
        }


        function _checkScaleType(transformTo, scaletype){
            var hue = {};
            hue.numerical = true;
            hue.ordinal = true;
            hue.nominal = false;

            var color = {};
            color.numerical = false;
            color.ordinal = null;
            color.nominal = true;
            
            var size = {};
            size.numerical = true;
            size.ordinal = true;
            size.nominal = false;

            var shape = {};
            shape.numerical = false;
            shape.ordinal = false;
            shape.nominal = true;

            var orientation = {};
            orientation.numerical = null;
            orientation.ordinal = null;
            orientation.nominal = null;

            var arrangement = {};
            arrangement.numerical = null;
            arrangement.ordinal = null;
            arrangement.nominal = true;

            if((transformTo === 'choropleth') && (hue[scaletype] == true)) return true;
            if((transformTo === 'proportionalSymbol') && (size[scaletype] == true)) return true;
            return false;
        }
    }
})();