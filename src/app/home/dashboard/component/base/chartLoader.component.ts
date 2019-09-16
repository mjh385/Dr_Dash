import { Component, ViewChild, Input, OnInit, OnDestroy, ViewContainerRef, ViewEncapsulation, ComponentFactoryResolver, ComponentRef, AfterViewInit } from '@angular/core';
import { GridsterComponent } from 'angular2gridster';

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

import { HomeService } from '../../../homeService';

@Component({
    selector: "app-chart-loader",
    templateUrl: "./chartLoader.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ChartLoaderComponent implements OnInit, OnDestroy {

    private componentRef: ComponentRef<{}>;

    constructor( public homeService: HomeService ,  private componentFactoryResolver: ComponentFactoryResolver) {
        this.homeService.changeChartColor.subscribe(value => {
            this.schemeColor=value;
            // this.renderComponent();
            setTimeout(()=>{   
                this.renderComponent();       
            }, 30); 
        });
    }  


    schemeColor:string = this.homeService.chartColor;
    
    private mappings = {
        'doughnut': PieChartComponent,  
        'pie': PieChartComponent, 
        'pie_advanced':AdvancedPieChartComponent,
        'pie_grid':PieGridComponent,  
        'bar_vertical': BarVerticalComponent,
        'bar_horizontal': BarHorizontalComponent,
        'bar_vertical_2d': BarVertical2DComponent, 
        'bar_horizontal_2d': BarHorizontal2DComponent,
        'bar_vertical_stacked': BarVerticalStackedComponent, 
        'bar_horizontal_stacked': BarHorizontalStackedComponent,
        'bar_vertical_normalized': BarVerticalNormalizedComponent, 
        'bar_horizontal_normalized': BarHorizontalNormalizedComponent, 
        'polar': PolarChartComponent,
        'line': LineChartComponent, 
        'bubble': BubbleChartComponent, 
        'area': AreaChartComponent, 
        'area_stacked': AreaChartStackedComponent,
        'area_normalized': AreaChartNormalizedComponent,   
        'force_directed' :ForceDirectedGraphComponent,  
        'heat_map' :HeatMapComponent, 
        'tree_map' :TreeMapComponent, 
        'number_card' :NumberCardComponent,  
        'gauge' :GaugeComponent, 
        'linear_gauge' :LinearGaugeComponent, 
    };

    getComponentType(typeName: string) {
        let type = this.mappings[typeName];
        return type;
    }

    @Input() chartInput: any;
    @Input() chartType: any;
    

    @ViewChild('chartLoderContainer', { read: ViewContainerRef })
    container: ViewContainerRef;
 
    ngOnInit() {  
        this.renderComponent(); 
    }

    ngAfterViewInit() {

    }

    renderComponent(){
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
        let componentType = this.getComponentType(this.chartType);  
        let factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.componentRef = this.container.createComponent(factory);  
        if (this.componentRef) {  
            for (let key in this.chartInput.chartOptions) { 
                this.componentRef.instance[key]=this.chartInput.chartOptions[key]
            } 
            if(this.schemeColor){ 
                this.componentRef.instance['scheme'] = this.schemeColor;
            }
        }
    }
    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

}

