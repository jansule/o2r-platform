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
            'Property': {
                'PropertyName': null,
                'DataType': null,
                'ScaleOfMeasurement': null,
                'Min': null,
                'Max': null,
                'ZoomFactor': null
            },
            'AdditionalInfo': {
                'Label': {
                    'Show': null,
                    'DataType': null,
                    'PropertyName': null
                },
                'Table': {
                    'Show': null,
                    'PropertyNames': []
                }
            },
            'Raw': {},
            'ThematicType': {
                'Type': 'choropleth',
                'Fill': {
                    'Fill': [],
                    'FillOpacity': null
                },
                'Classes': {
                    'Classes': [],
                    'NrOfClasses': null
                },
                'Stroke': {
                    'Stroke': null,
                    'StrokeWidth': null
                },
                'Legend': {
                    'ShowMin': null,
                    'ShowMax': null,
                    'Title': null,
                    'Position': null
                }
            }
        };
        var proportionalSymbolDummy = {
            'Property': {
                'PropertyName': null,
                'DataType': null,
                'ScaleOfMeasurement': null,
                'Min': null,
                'Max': null,
                'ZoomFactor': null
            },
            'AdditionalInfo': {
                'Label': {
                    'Show': null,
                    'DataType': null,
                    'PropertyName': null
                },
                'Table': {
                    'Show': null,
                    'PropertyNames': []
                }
            },
            'Raw': {},
            'ThematicType': {
                'Type': 'proportionalSymbol',
                'Fill': {
                    'Fill': null,
                    'FillOpacity': null
                },
                'Legend': {
                    'NrOfSymbols': null,
                    'ShowMaxSize': null,
                    'ShowMinSize': null,
                    'ShowMax': null,
                    'ShowMin': null,
                    'Title': null,
                    'Position': null
                },
                'Polygon': {
                    'Fill': {
                        'Fill': null,
                        'FillOpacity': null
                    },
                    'Stroke': {
                        'Stroke': null,
                        'StrokeWidth': null
                    }
                },
                'RadialFactor': null,
                'Stroke': {
                    'Stroke': null,
                    'StrokeWidth': null
                },
                'WellKnownName': null
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
            if((m1.ThematicType.Type == 'choropleth' && m2.ThematicType.Type == 'proportionalSymbol') || (m1.ThematicType.Type == 'proportionalSymbol' && m2.ThematicType.Type == 'choropleth')){
                var first = {};
                first.m1 = _rateAndImprove(m1, false);
                first.m2 = _rateAndImprove(m2, false);
                result.push(first);
                if((m1.ThematicType.Type == 'choropleth') && (_checkScaleType('choropleth', m2.Property.ScaleOfMeasurement) == true)){
                    var second = {};
                    second.m1 = _rateAndImprove(m1, false);
                    second.m2 = _transformAndImprove(m2, 'choropleth', false);
                    result.push(second);
                } else if((m2.ThematicType.Type == 'choropleth') && (_checkScaleType('choropleth', m1.Property.ScaleOfMeasurement) == true)){
                    second.m1 = _transformAndImprove(m1, 'choropleth', false);
                    second.m2 = _rateAndImprove(m2, false);
                    result.push(second);
                }
            }
            if(m1.ThematicType.Type == 'choropleth' && m2.ThematicType.Type == 'choropleth'){
                var first = {};
                first.m1 = _rateAndImprove(m1, false);
                first.m2 = _rateAndImprove(m2, false);
                result.push(first);

                var canTransFst = _checkScaleType('proportionalSymbol', m1.Property.ScaleOfMeasurement);
                var canTransSnd = _checkScaleType('proportionalSymbol', m2.Property.ScaleOfMeasurement);
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
            if(m1.ThematicType.Type == 'proportionalSymbol' && m2.ThematicType.Type == 'proportionalSymbol'){
                var first = {};
                first.m1 = _rateAndImprove(m1, false);
                first.m2 = _rateAndImprove(m2, false);
                result.push(first);

                var canTransFst = _checkScaleType('choropleth', m1.Property.ScaleOfMeasurement);
                var canTransSnd = _checkScaleType('choropleth', m2.Property.ScaleOfMeasurement);

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
            if(map.ThematicType.Type == 'proportionalSymbol'){
                if(map.ThematicType.Legend.ShowMinSize == false) result.ThematicType.Legend.ShowMinSize = true;
                if(map.ThematicType.Legend.ShowMaxSize == false) result.ThematicType.Legend.ShowMaxSize = true;
                if(map.ThematicType.WellKnownName == 'other') result.ThematicType.WellKnownName = 'circle';
            }
            if(map.AdditionalInfo.Table.Show == false){
                result.AdditionalInfo.Table.Show = true;
                result.AdditionalInfo.Table.PropertyNames.push(result.Property.PropertyName);
            }
            if(map.AdditionalInfo.Label.Show == false){
                result.AdditionalInfo.Label.Show = showlabel;
                result.AdditionalInfo.Label.PropertyName = result.Property.PropertyName;
            }
            if(map.ThematicType.Legend.ShowMin == false) result.ThematicType.Legend.ShowMin = true;
            if(map.ThematicType.Legend.ShowMax == false) result.ThematicType.Legend.ShowMax = true;
            return result;
        }

        function _transformAndImprove(map, maptype, showlabel){
            var result;
            if(maptype == 'choropleth') {
                result = angular.copy(choroplethDummy);
                result.Property.PropertyName = map.Property.PropertyName;
                result.Property.DataType = map.Property.DataType;
                result.Property.ScaleOfMeasurement = map.Property.ScaleOfMeasurement;
                result.Property.Min = map.Property.Min;
                result.Property.Max = map.Property.Max;
                result.Property.ZoomFactor = map.Property.ZoomFactor;

                result.AdditionalInfo.Label.Show = showlabel;
                result.AdditionalInfo.Label.DataType = map.AdditionalInfo.Label.DataType || map.Property.DataType;
                result.AdditionalInfo.Label.PropertyName = map.AdditionalInfo.Label.PropertyName || map.Property.PropertyName;

                result.AdditionalInfo.Table.Show = true;
                if(map.AdditionalInfo.Table.PropertyNames.length != 0){
                    for(var i in map.AdditionalInfo.Table.PropertyNames){
                        result.AdditionalInfo.Table.PropertyNames.push(map.AdditionalInfo.Table.PropertyNames[i]);
                    }
                } else {
                    result.AdditionalInfo.Table.PropertyNames.push(map.Property.PropertyName);
                }

                result.ThematicType.Type = 'choropleth';
                result.ThematicType.Classes.NrOfClasses = 5;
                result.ThematicType.Fill.Fill = _getColorRange(map.ThematicType.Fill.Fill, result.ThematicType.Classes.NrOfClasses);
                result.ThematicType.Fill.FillOpacity = map.ThematicType.Fill.FillOpacity;
                result.ThematicType.Stroke.Stroke = map.ThematicType.Polygon.Stroke.Stroke;
                result.ThematicType.Stroke.StrokeWidth = map.ThematicType.Polygon.Stroke.StrokeWidth;
                result.ThematicType.Classes.Classes = _createClasses(map.Property.Max, result.ThematicType.Classes.NrOfClasses, map.Property.ScaleOfMeasurement);
                
                result.ThematicType.Legend.ShowMin = true;
                result.ThematicType.Legend.ShowMax = true;
                result.ThematicType.Legend.Title = map.ThematicType.Legend.Title;
                result.ThematicType.Legend.Position = map.ThematicType.Legend.Position;

                result.Raw = map.Raw;
            }
            if(maptype == 'proportionalSymbol'){
                result = angular.copy(proportionalSymbolDummy);
                result.Property.PropertyName = map.Property.PropertyName;
                result.Property.DataType = map.Property.DataType;
                result.Property.ScaleOfMeasurement = map.Property.ScaleOfMeasurement;
                result.Property.Min = map.Property.Min;
                result.Property.Max = map.Property.Max;
                result.Property.ZoomFactor = map.Property.ZoomFactor;
                
                result.AdditionalInfo.Label.Show = showlabel;
                result.AdditionalInfo.Label.DataType = map.AdditionalInfo.Label.DataType || map.Property.DataType;
                result.AdditionalInfo.Label.Show = map.AdditionalInfo.Label.Show || map.Property.PropertyName;

                result.AdditionalInfo.Table.Show = true;
                if(map.AdditionalInfo.Table.PropertyNames.length != 0){
                    for(var i in map.AdditionalInfo.Table.PropertyNames){
                        result.AdditionalInfo.Table.PropertyNames.push(map.AdditionalInfo.Table.PropertyNames[i]);
                    }
                } else {
                    result.AdditionalInfo.Table.PropertyNames.push(map.Property.PropertyName);
                }

                result.ThematicType.Type = 'proportionalSymbol';
                result.ThematicType.Fill = _getMiddleColor(map.ThematicType.Fill.Fill);
                result.ThematicType.WellKnownName = 'circle';
                result.ThematicType.RadialFactor = 0.15;
                result.ThematicType.Stroke.Stroke = map.ThematicType.Stroke.Stroke;
                result.ThematicType.Stroke.StrokeWidth = map.ThematicType.Stroke.StrokeWidth;
                result.ThematicType.Polygon.Fill.Fill = '#FFF',
                result.ThematicType.Polygon.Fill.FillOpacity = 0;
                result.ThematicType.Polygon.Stroke.Stroke = map.ThematicType.Stroke.Stroke;
                result.ThematicType.Polygon.Stroke.StrokeWidth = map.ThematicType.Stroke.StrokeWidth;
                result.ThematicType.Legend.NrOfSymbols = 4;
                result.ThematicType.Legend.ShowMaxSize = true;
                result.ThematicType.Legend.ShowMinSize = true;
                result.ThematicType.Legend.ShowMax = true;
                result.ThematicType.Legend.ShowMin = true;
                result.ThematicType.Legend.Title = map.ThematicType.Legend.Title;
                result.ThematicType.Legend.Position = map.ThematicType.Legend.Position;

                result.Raw = map.Raw;
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
            var value = {};
            value.numerical = true;
            value.ordinal = true;
            value.nominal = false;

            var hue = {};
            hue.numerical = false;
            hue.ordinal = null;
            hue.nominal = true;
            
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

            if((transformTo === 'choropleth') && (value[scaletype] == true)) return true;
            if((transformTo === 'proportionalSymbol') && (size[scaletype] == true)) return true;
            return false;
        }
    }
})();