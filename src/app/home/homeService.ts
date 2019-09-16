 import { Injectable } from '@angular/core';
 import {Subject} from 'rxjs/Rx';
 
 @Injectable() 
 export class HomeService {
  
    chartColor: string = 'forest'; 
    backgroundColor: string = ''; 
    currentDashboard: any ; 
    changeChartColor: Subject<string> = new Subject<string>();
    changeBackgroundColor: Subject<string> = new Subject<string>();
    changeCurrentDashboard: Subject<any> = new Subject<any>();
    
    constructor()  { 
    }

    newChartColor(value : string) {
        this.chartColor = value; 
        this.changeChartColor.next(value);
    }
    newBackgroundColor(value : string) {
        this.backgroundColor = value;
        this.changeBackgroundColor.next(value);
    }
    newCurrentDashboard(value : any) {
        this.currentDashboard = value;
        this.changeCurrentDashboard.next(value);
    }

 }


