import { Component, Input, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap"; 
import { chartConfig } from '../component/base/chart/chartConfig';
import { DashboardService, WidgetService } from '../services';

@Component({
    selector: "container",
    templateUrl: "./container.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ContainerComponent implements OnInit {

  constructor(private modalService: NgbModal, private dashboardService: DashboardService, private widgetService: WidgetService) {
  }

  public config_line: any;
  public config_bar_vertical: any;
  public config_pie: any;
  public config_polar: any;
  public config_bar_horizontal_2d: any;
  public config_area_stacked: any;
  public config_tree_map: any;
  public config_gauge: any;
  public config_area: any;
  public config_bubble: any;
  public config_pie_grid: any;
  public config_heat_map: any;
  public config_number_card: any;
  public config_linear_gauge: any;
  public config_force_directed: any;
  public config_area_normalized: any;
  public config_doughnut: any;
  public config_pie_advanced: any;

   

  end($event) {
      if($event.action=='resize'){
          window.dispatchEvent(new Event('resize')); 
      }
  }

  ngOnInit() {    
    this.config_line = {
      chartOptions: chartConfig['line'],   
    };
    this.config_bar_vertical = {
      chartOptions: chartConfig['bar_vertical'],   
    };  
    this.config_pie = {
      chartOptions: chartConfig['pie'],   
    }; 
    this.config_polar = {
      chartOptions: chartConfig['polar'],   
    }; 
    this.config_tree_map = {
      chartOptions: chartConfig['tree_map'],   
    };  
    this.config_gauge = {
      chartOptions: chartConfig['gauge'],   
    };  
    this.config_area = {
      chartOptions: chartConfig['area'],   
    };  
    this.config_bubble = {
      chartOptions: chartConfig['bubble'],   
    };  
    this.config_pie_grid = {
      chartOptions: chartConfig['pie_grid'],   
    };   
    this.config_heat_map = {
      chartOptions: chartConfig['heat_map'],   
    };  
    this.config_number_card = {
      chartOptions: chartConfig['number_card'],   
    };  
    this.config_linear_gauge = {
      chartOptions: chartConfig['linear_gauge'],   
    };  
    this.config_force_directed = {
      chartOptions: chartConfig['force_directed'],   
    };  
    this.config_area_stacked = {
      chartOptions: chartConfig['area_stacked'],   
    };  
    this.config_area_normalized = {
      chartOptions: chartConfig['area_normalized'],   
    };  
    this.config_doughnut = {
      chartOptions: chartConfig['doughnut'],   
    };  
    this.config_pie_advanced = {
      chartOptions: chartConfig['pie_advanced'],   
    };        
    this.config_bar_horizontal_2d = {
      chartOptions: chartConfig['bar_horizontal_2d'],   
    };   
  }

  gridsterDraggableOptions={}

  gridsterOptions = {
      lanes: 20, // how many lines (grid cells) dashboard has 
      defaultWidth: 3,
      defaultHeight: 3,
      direction: "vertical", // items floating direction: vertical/horizontal
      dragAndDrop: true, // possible to change items position by drag n drop
      resizable: true, // possible to resize items by drag n drop by item edge/corner
      useCSSTransforms: true, // improves rendering performance by using CSS transform in place of left/top
      floating: true, //(gravity) If it"s true, gridster will move item to very top or left (according to direction) to reduce space between items. If set to false gridster will allow to place an item in any position.        
      lines: { visible: false, always: true, color: "#d8d8d8", width: 1, backgroundColor: "" },
      shrink: true,
      responsiveView: true,
      responsiveOptions: [
          {
              breakpoint: "sm",
              lanes: 3
          },
          {
              breakpoint: "md",
              minWidth: 768,
              lanes: 10,
              dragAndDrop: true,
              resizable: true
          },
          {
              breakpoint: "lg",
              lanes: 20,
              dragAndDrop: true,
              resizable: true
          },
          {
              breakpoint: "xl",
              minWidth: 1800,
              lanes: 30,
              dragAndDrop: true,
              resizable: true
          }
      ]
  };

 
}
 