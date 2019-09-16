import { DataService } from './data.service';
import { Widget } from "../models/index";
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HomeService } from '../../homeService';

const url='http://localhost:4000/api/v1.0/widget';

@Injectable()
export class WidgetService extends DataService {
    constructor(http: Http, private homeService: HomeService) {
        super(url, http);
    }
    
    createWidget(dashboardId: string, widget: Widget) {
        return this.create(dashboardId ,widget);
    }

    getAllWidget(dashboardId: string) {
        return this.getAll(dashboardId);
    }

    getWidgetData(widgetId: string , option: any) {
        return this.getData(widgetId, option);
    }
    
    removeWidget(widgetId: string){ 
        this.homeService.currentDashboard.widgets.map((item , index) => {
            if(item._id == widgetId){
                this.homeService.currentDashboard.widgets.splice(index, 1);
                this.homeService.newCurrentDashboard(this.homeService.currentDashboard);
            }
        })  
        return this.remove(widgetId);
    } 
    
    updateWidget(widgetId: string, widget: Widget){
        this.homeService.currentDashboard.widgets.map((item) => { 
            if(item._id == widgetId){ 
                item = widget;
                this.homeService.newCurrentDashboard(this.homeService.currentDashboard);
            }
        })  
        return this.update(widgetId, widget);
    }

}