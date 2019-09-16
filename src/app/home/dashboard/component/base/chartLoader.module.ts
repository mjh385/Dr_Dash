import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridsterModule } from 'angular2gridster';
import { ChartsModule } from './chart/charts.module'; 
import { ChartLoaderComponent } from './chartLoader.component';
   

import { PieChartComponent } from './chart/pie-chart/pie-chart.component'; 
import { AdvancedPieChartComponent } from './chart/pie-chart/advanced-pie-chart.component';
import { PieGridComponent } from './chart/pie-chart/pie-grid.component'; 
import { BarVerticalComponent } from './chart/bar-chart/bar-vertical.component';
import { BarHorizontalComponent } from './chart/bar-chart/bar-horizontal.component';
import { BarVertical2DComponent } from './chart/bar-chart/bar-vertical-2d.component';
import { BarHorizontal2DComponent } from './chart/bar-chart/bar-horizontal-2d.component';
import { BarVerticalStackedComponent } from './chart/bar-chart/bar-vertical-stacked.component';
import { BarHorizontalStackedComponent } from './chart/bar-chart/bar-horizontal-stacked.component'; 
import { BarVerticalNormalizedComponent } from './chart/bar-chart/bar-vertical-normalized.component';
import { BarHorizontalNormalizedComponent } from './chart/bar-chart/bar-horizontal-normalized.component';  
import { PolarChartComponent } from './chart/polar-chart/polar-chart.component';
import { LineChartComponent } from './chart/line-chart/line-chart.component';
import { BubbleChartComponent } from './chart/bubble-chart/bubble-chart.component';
import { AreaChartComponent } from './chart/area-chart/area-chart.component';
import { AreaChartStackedComponent } from './chart/area-chart/area-chart-stacked.component';
import { AreaChartNormalizedComponent } from './chart/area-chart/area-chart-normalized.component'; 
import { ForceDirectedGraphComponent } from './chart/force-directed-graph/force-directed-graph.component';
import { HeatMapComponent } from './chart/heat-map/heat-map.component';
import { TreeMapComponent } from './chart/tree-map/tree-map.component';
import { NumberCardComponent } from './chart/number-card/number-card.component';
import { GaugeComponent } from './chart/gauge/gauge.component';
import { LinearGaugeComponent } from './chart/gauge/linear-gauge.component';

 
@NgModule({

    declarations: [
        ChartLoaderComponent, 
        PieChartComponent,
        AdvancedPieChartComponent,
        PieGridComponent,

        BarVerticalComponent,
        BarHorizontalComponent,
        BarVertical2DComponent,
        BarHorizontal2DComponent,
        BarVerticalStackedComponent,
        BarHorizontalStackedComponent,
        BarVerticalNormalizedComponent,
        BarHorizontalNormalizedComponent, 
        PolarChartComponent,
        LineChartComponent,
        BubbleChartComponent,
        AreaChartComponent,
        AreaChartStackedComponent,
        AreaChartNormalizedComponent, 
        ForceDirectedGraphComponent, 
        HeatMapComponent, 
        TreeMapComponent, 
        NumberCardComponent, 
        GaugeComponent, 
        LinearGaugeComponent, 
    ],
    entryComponents: [
        PieChartComponent,
        AdvancedPieChartComponent,
        PieGridComponent,

        BarVerticalComponent,
        BarHorizontalComponent,
        BarVertical2DComponent,
        BarHorizontal2DComponent,
        BarVerticalStackedComponent,
        BarHorizontalStackedComponent,
        BarVerticalNormalizedComponent,
        BarHorizontalNormalizedComponent, 
        PolarChartComponent,
        LineChartComponent,
        BubbleChartComponent,
        AreaChartComponent,
        AreaChartStackedComponent,
        AreaChartNormalizedComponent, 
        ForceDirectedGraphComponent, 
        HeatMapComponent, 
        TreeMapComponent, 
        NumberCardComponent, 
        GaugeComponent, 
        LinearGaugeComponent, 
    ], 
    exports: [
        ChartLoaderComponent,  
    ],
    providers:[
        
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        GridsterModule,
        ChartsModule,  
    ]
})
export class ChartLoaderModule {
}