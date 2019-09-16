import { DataService } from './data.service';
import { WidgetService } from './widget.service';

import { Dashboard } from "../models/index";
import { Http } from "@angular/http";
import { Injectable} from '@angular/core';
import { HomeService } from '../../homeService';

const url='http://localhost:4000/api/v1.0/dashboard';

@Injectable()
export class DashboardService extends DataService {
    constructor(http: Http, private homeService: HomeService, private widgetService: WidgetService) {
        super(url, http);
    }
    public dashboards : any = [];

 
        
    createDashboard(dashboard: Dashboard) {
        return this.create('' ,dashboard);
    }
   
    updateDashboard(dashboard: Dashboard){
        this.dashboards.map((item) => { 
            if(item._id  == dashboard._id ){ 
                item = dashboard;  
                this.changeSelectedDashboard(dashboard._id) 
            }
        })  
        return this.update(dashboard._id, dashboard);
    }
    
    removeDashboard(id: string){ 
        this.dashboards.map((item , index) => {
            if(item._id == id){
                this.dashboards.splice(index, 1)
            }
        })  
        return this.remove(id);
    } 
     
    getAllDashboard() {
        //return this.getAll('');
        this.homeService.newCurrentDashboard(this.dashboards[0]);
        return this.dashboards[0];
            
    }

    changeSelectedDashboard(dashboardId){  
        this.dashboards.map((item) => { 
            if(item._id == dashboardId){ 
                // if(item.widgets){
                //     this.homeService.newCurrentDashboard(item);
                //     this.homeService.newChartColor(item.configs.theme.chartColor); 
                //     this.homeService.newBackgroundColor(item.configs.theme.backgroundColor);
                // }else{
                    this.widgetService.getAll(dashboardId).subscribe(
                        data => {
                            item['widgets'] = data.data;
                            this.homeService.newCurrentDashboard(item);
                            this.homeService.newChartColor(item.configs.theme.chartColor); 
                            this.homeService.newBackgroundColor(item.configs.theme.backgroundColor);
                        },
                        error => {
                            console.log(error.originalError._body)
                        }
                    ); 
               //}
            }
        })
    }
 
    setDashboards(dashboards: any, dashboardId:string){
        this.dashboards = dashboards;
        if(this.dashboards && this.dashboards.length > 0) {
            if(dashboardId){
                this.changeSelectedDashboard(dashboardId);
            }else{
                let dashboardIdTemp = this.dashboards[this.dashboards.length -1]._id;
                if(!this.homeService.currentDashboard || this.homeService.currentDashboard < 1) {
                    this.dashboards.map((item) => {
                        if(item.isDefault) {
                            dashboardIdTemp = item._id;   
                        } 
                    }) 
                } 
                this.changeSelectedDashboard(dashboardIdTemp);
            }
   
        }
    }
   
}















 