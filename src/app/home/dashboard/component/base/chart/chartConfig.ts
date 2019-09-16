import { single , multi , bubble , dateData , dateDataWithRange , generateGraph , barChart, lineChartSeries ,timelineFilterBarData} from './data';
import { formatLabel } from './common/label.helper';
import { colorSets } from './utils/color-sets';
import * as shape from 'd3-shape';

var color = 'air';
function setColorScheme(name){
    return colorSets.find(s => s.name === name);
}; 
function yLeftAxisScale(min, max) {
    return { min: `${min}`, max: `${max}` };
} 
function yRightAxisScale(min, max) {
    return { min: `${min}`, max: `${max}` };
} 
function yLeftTickFormat(data) {
    return `${data.toLocaleString()}`;
} 
function yRightTickFormat(data) {
    return `${data}%`;
}

const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
const weekdayName = new Intl.DateTimeFormat('en-us', { weekday: 'short' }); 
const graphData = generateGraph(20);
function getCalendarData() {
    // today
    const now = new Date();
    const todaysDay = now.getDate();
    const thisDay = new Date(now.getFullYear(), now.getMonth(), todaysDay);

    // Monday
    const thisMonday = new Date(thisDay.getFullYear(), thisDay.getMonth(), todaysDay - thisDay.getDay() + 1);
    const thisMondayDay = thisMonday.getDate();
    const thisMondayYear = thisMonday.getFullYear();
    const thisMondayMonth = thisMonday.getMonth();

    // 52 weeks before monday
    const calendarData = [];
    const getDate = d => new Date(thisMondayYear, thisMondayMonth, d);
    for (let week = -52; week <= 0; week++) {
        const mondayDay = thisMondayDay + (week * 7);
        const monday = getDate(mondayDay);

        // one week
        const series = [];
        for (let dayOfWeek = 7; dayOfWeek > 0; dayOfWeek--) {
            const date = getDate(mondayDay - 1 + dayOfWeek);

            // skip future dates
            if (date > now) {
                continue;
            }

            // value
            const value = (dayOfWeek < 6) ? (date.getMonth() + 1) : 0;

            series.push({
                date,
                name: weekdayName.format(date),
                value
            });
        }

        calendarData.push({
            name: monday.toString(),
            series
        });
    }

    return calendarData;
}

function calendarTooltipText(c) {
    return `
        <span class="tooltip-label">${c.label} • ${c.cell.date.toLocaleDateString()}</span>
        <span class="tooltip-val">${c.data.toLocaleString()}</span>
    `;
}

function calendarAxisTickFormatting(mondayString: string) {
    const monday = new Date(mondayString);
    const month = monday.getMonth();
    const day = monday.getDate();
    const year = monday.getFullYear();
    const lastSunday = new Date(year, month, day - 1);
    const nextSunday = new Date(year, month, day + 6);
    return (lastSunday.getMonth() !== nextSunday.getMonth()) ? monthName.format(nextSunday) : '';
}

function gdpLabelFormatting(c) {
    return `${c.label}<br/><small class="number-card-label">GDP Per Capita</small>`;
}

function currencyFormatting(c) {
    return `\$${Math.round(c.value).toLocaleString()}`;
}

const curves = {
    'Basis': shape.curveBasis,
    'Basis Closed': shape.curveBasisClosed,
    'Bundle': shape.curveBundle.beta(1),
    'Cardinal': shape.curveCardinal,
    'Cardinal Closed': shape.curveCardinalClosed,
    'Catmull Rom': shape.curveCatmullRom,
    'Catmull Rom Closed': shape.curveCatmullRomClosed,
    'Linear': shape.curveLinear,
    'Linear Closed': shape.curveLinearClosed,
    'Monotone X': shape.curveMonotoneX,
    'Monotone Y': shape.curveMonotoneY,
    'Natural': shape.curveNatural,
    'Step': shape.curveStep,
    'Step After': shape.curveStepAfter,
    'Step Before': shape.curveStepBefore,
    'default': shape.curveLinear
}; 

const closedCurveType = 'Monotone X'//'Catmull Rom'//'Cardinal'//'Natural';

export const chartConfig = { 
 
    chartType :{
        doughnut: 'doughnut',
        pie :'pie', 
        pie_advanced :'pie_advanced', 
        pie_grid :'pie_grid', 
        bar_vertical :'bar_vertical', 
        bar_horizontal :'bar_horizontal', 
        bar_vertical_2d :'bar_vertical_2d', 
        bar_horizontal_2d :'bar_horizontal_2d', 
        bar_vertical_stacked :'bar_vertical_stacked', 
        bar_horizontal_stacked :'bar_horizontal_stacked', 
        bar_vertical_normalized :'bar_vertical_normalized', 
        bar_horizontal_normalized :'bar_horizontal_normalized', 
        polar :'polar', 
        line :'line', 
        bubble :'bubble', 
        area :'area', 
        area_stacked :'area_stacked', 
        area_normalized :'area_normalized', 
        force_directed :'force_directed',
        heat_map :'heat_map',
        tree_map :'tree_map',
        number_card :'number_card',
        gauge :'gauge',
        linear_gauge :'linear_gauge',
    }, 
    doughnut:{
        scheme : setColorScheme(color),
        results : single,
        animations : true,
        legend : true,
        legendTitle : 'زیر عنوان',
        explodeSlices : false, 
        labels:true,
        doughnut : true,
        arcWidth : 0.25,
        gradient : true,
        tooltipDisabled : false, 
        tooltipText({ data }) {
            const label = formatLabel(data.name);
            const val = formatLabel(data.value); 
            return `
                <span class="tooltip-label">${label}</span>
                <span class="tooltip-val">$${val}</span>
                `;
        },
    },
    pie:{
        scheme : setColorScheme(color),
        results : single,
        animations : true,
        legend : true,
        legendTitle : 'زیر عنوان',
        explodeSlices : false, 
        labels:true,
        doughnut : false,
        arcWidth : 0.25,
        gradient : true,
        tooltipDisabled : false, 
        tooltipText({ data }) {
            const label = formatLabel(data.name);
            const val = formatLabel(data.value); 
            return `
                <span class="tooltip-label">${label}</span>
                <span class="tooltip-val">$${val}</span>
                `;
        },
    },
    pie_advanced:{
        scheme : setColorScheme(color),
        results : single,
        animations : true,
        gradient : true,
        tooltipDisabled : false, 
        tooltipText({ data }) {
            const label = formatLabel(data.name);
            const val = formatLabel(data.value); 
            return `
                <span class="tooltip-label">${label}</span>
                <span class="tooltip-val">$${val}</span>
                `;
        },
        
    },
    pie_grid:{
        scheme : setColorScheme(color),
        results : single,
        animations : true,
        tooltipDisabled : false, 
        tooltipText({ data }) {
            const label = formatLabel(data.name);
            const val = formatLabel(data.value); 
            return `
                <span class="tooltip-label">${label}</span>
                <span class="tooltip-val">$${val}</span>
                `;
        },
        
    }, 
    bar_vertical:{
        scheme : setColorScheme(color),
        results : single,        
        schemeType:'ordinal',
        customColors: [{name: 'Germany', value: '#0000ff'}],
        animations : true,
        gradient : true,
        xAxis : true,
        yAxis : true,
        legend : true,
        legendTitle : 'زیر عنوان',
        showXAxisLabel : false,
        showYAxisLabel : false,
        tooltipDisabled : false, 
        xAxisLabel : '',
        yAxisLabel : '',
        showGridLines : true,
        barPadding : 8, 
        roundDomains : true,
        roundEdges : true,
        yScaleMax : '',
        showDataLabel : true,  
    },
    bar_horizontal:{ 
        scheme : setColorScheme(color),
        results : single,
        schemeType:'ordinal',
        animations : true,
        gradient : true,
        xAxis : true,
        yAxis : true,
        legend : true,
        legendTitle : 'زیر عنوان',
        showXAxisLabel : false,
        showYAxisLabel : false,
        tooltipDisabled : false, 
        xAxisLabel : '',
        yAxisLabel : '',
        showGridLines : true,
        barPadding : 8, 
        roundDomains : true,
        roundEdges : true,
        xScaleMax : '',
        showDataLabel : true,  
    },
    bar_vertical_2d:{ 
        scheme : setColorScheme(color),
        results : multi,
        schemeType:'ordinal',
        animations : true,
        gradient : true,
        xAxis : true,
        yAxis : true,
        legend : true,
        legendTitle : 'زیر عنوان',
        showXAxisLabel : false,
        showYAxisLabel : false,
        tooltipDisabled : false, 
        xAxisLabel : '',
        yAxisLabel : '', 
        showGridLines : true,
        barPadding : 8, 
        groupPadding:16, 
        roundDomains : true,
        roundEdges : true,
        yScaleMax : '',
        showDataLabel : true,  
    },
    bar_horizontal_2d:{
        scheme : setColorScheme(color),
        results : multi,
        schemeType:'ordinal',
        animations : true,
        gradient : true,
        tooltipDisabled : false, 
        xAxis : true,
        yAxis : true,
        legend : true,
        legendTitle : 'زیر عنوان', 
        showXAxisLabel : false,
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '',
        showGridLines : true,
        barPadding : 8, 
        groupPadding:16, 
        roundDomains : true,
        roundEdges : true,
        xScaleMax : '',
        showDataLabel : true,  
    },
    bar_vertical_stacked:{
        scheme : setColorScheme(color),
        results : multi,
        schemeType:'ordinal',
        animations : true,
        gradient : true,
        tooltipDisabled : false, 
        xAxis : true,
        yAxis : true,
        legend : true,
        legendTitle : 'زیر عنوان', 
        showXAxisLabel : false,
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '',
        showGridLines : true,
        barPadding : 8, 
        roundDomains : true,
        yScaleMax : '',
        showDataLabel : true,  
    },
    bar_horizontal_stacked:{
        scheme : setColorScheme(color),
        results : multi,
        schemeType:'ordinal',
        animations : true,
        gradient : true,
        tooltipDisabled : false, 
        xAxis : true,
        yAxis : true,
        legend : true,
        legendTitle : 'زیر عنوان',
        showXAxisLabel : false, 
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '',
        showGridLines : true,
        barPadding : 8, 
        roundDomains : true,
        showDataLabel : true, 
        xScaleMax : '', 
    },
    bar_vertical_normalized:{
        scheme : setColorScheme(color),
        results : multi,
        schemeType:'ordinal',
        animations : true,
        gradient : true,
        tooltipDisabled : false, 
        xAxis : true,
        yAxis : true,
        legend : true,
        legendTitle : 'زیر عنوان',
        showXAxisLabel : false, 
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '',
        showGridLines : true,
        barPadding : 8, 
        roundDomains : true, 
    },
    bar_horizontal_normalized:{
        scheme : setColorScheme(color),
        results : multi,
        schemeType:'ordinal',
        animations : true,
        gradient : true,
        tooltipDisabled : false, 
        xAxis : true,
        yAxis : true,
        legend : true,
        legendTitle : 'زیر عنوان',
        showXAxisLabel : false,
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '', 
        showGridLines : true,
        barPadding : 8, 
        roundDomains : true, 
    }, 
    polar:{
        scheme : setColorScheme(color),
        results : multi,
        schemeType:'ordinal',
        animations : true,
        legend : true,
        legendTitle : 'زیر عنوان', 
        gradient : true,
        xAxis : true,
        yAxis : true,
        showXAxisLabel : false,
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '',
        autoScale : true,
        showGridLines : true,
        rangeFillOpacity:0.15,
        roundDomains : true,
        tooltipDisabled : false, 
        showSeriesOnHover : true,  
        curve : curves[closedCurveType],   
    },
    line:{
        scheme : setColorScheme(color),
        results : dateDataWithRange,        
        schemeType:'ordinal',
        animations : true,
        legend : true,
        legendTitle : 'زیر عنوان', 
        gradient : true,
        xAxis : true,
        yAxis : true,
        showXAxisLabel : false,
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '',
        autoScale : true, 
        xScaleMin : 0,
        yScaleMin : 0, 
        xScaleMax : '',
        yScaleMax : '',
        timeline : false,
        showGridLines : true, 
        curve : curves[closedCurveType],   
        rangeFillOpacity:0.15,
        roundDomains : true,
        tooltipDisabled : false,  
    },
    bubble:{
        scheme : setColorScheme(color), 
        results : bubble,
        animations : true,
        showGridLines : true,
        legend : true,
        legendTitle : 'زیر عنوان',
        xAxis : true,
        yAxis : true,
        showXAxisLabel : false,
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '',
        autoScale : true,
        xScaleMin : 0,
        yScaleMin : 0,
        xScaleMax : '', 
        yScaleMax : '',
        schemeType:'ordinal',
        roundDomains : true,
        tooltipDisabled : false, 
        minRadius : 3,
        maxRadius : 10,
    },
    area:{
        scheme : setColorScheme(color),
        results : dateData,
        schemeType:'ordinal',
        animations : true,
        legend : true,
        legendTitle : 'زیر عنوان', 
        gradient : true,
        xAxis : true,
        yAxis : true,
        showXAxisLabel : false,
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '',
        autoScale : true,
        xScaleMin : 0,
        xScaleMax : '',
        yScaleMin : 0,
        yScaleMax : '',
        timeline : false,
        showGridLines : true,
        roundDomains : true,
        curve : curves[closedCurveType],   
        tooltipDisabled : false, 
        
    },
    area_stacked:{
        scheme : setColorScheme(color),
        results : dateData,
        schemeType:'ordinal',
        animations : true,
        legend : true,
        legendTitle : 'زیر عنوان',
        gradient : true,
        xAxis : true,
        yAxis : true, 
        showXAxisLabel : false,
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '',
        timeline : false,
        xScaleMin : 0,
        xScaleMax : '',
        yScaleMin : 0,
        yScaleMax : '',
        showGridLines : true,
        roundDomains : true,
        tooltipDisabled : false, 
        curve : curves[closedCurveType],  
    },
    area_normalized:{
        scheme : setColorScheme(color),
        results : dateData,
        schemeType:'ordinal',
        animations : true,
        legend : true,
        legendTitle : 'زیر عنوان',
        gradient : true,
        xAxis : true, 
        yAxis : true,
        showXAxisLabel : false,
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '',
        timeline : false,
        showGridLines : true,
        roundDomains : true,
        tooltipDisabled : false, 
        curve : curves[closedCurveType],  
    },
    force_directed:{
        scheme : setColorScheme(color),  
        legend : true,
        legendTitle : 'زیر عنوان',
        links : graphData.links, 
        animations : true, 
        nodes : graphData.nodes, 
        tooltipDisabled : false,  
    },  
    heat_map:{    
        scheme : setColorScheme(color),
        results : multi,
        animations : true,
        legend : true,
        gradient : true,
        xAxis : true,
        yAxis : true,
        showXAxisLabel : false,
        showYAxisLabel : false,
        xAxisLabel : '',
        yAxisLabel : '',
        innerPadding : '10%',
        tooltipDisabled : false,
    },
    tree_map:{ 
        scheme : setColorScheme(color),
        results : single,
        animations : true,
        tooltipDisabled : false,
        labelFormatting : gdpLabelFormatting,
        valueFormatting: currencyFormatting,
        gradient : true, 
    }, 
    number_card:{
        scheme : setColorScheme(color),
       // cardColor : "#232837",
        //emptyColor : "#1e222e",
        results : single,
        animations : true,
    }, 
    gauge:{ 
        legend : true,
        legendTitle : 'زیر عنوان',
        results : single,
        animations : true,
        textValue : '',
        scheme : setColorScheme(color),
        min : 0,
        max : 100,
        units : 'alerts',
        angleSpan : 240,
        startAngle : -120,
        showAxis : true,
        bigSegments : 10,
        smallSegments : 5,
        margin : null,
        tooltipDisabled : false,
    }, 
    linear_gauge:{
        scheme : setColorScheme(color),
        animations : true,
        min : 0,
        max : 100,
        value : 50,
        previousValue : 70,
        units : 'کاربر آنلاین',
    },
     
}



