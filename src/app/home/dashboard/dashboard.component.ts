import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HomeService } from '../homeService';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.m-body.m-rtl",
    templateUrl: "./dashboard.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

    display: boolean = false;
    
    public theme = this.homeService.backgroundColor;
    constructor(public homeService: HomeService) {
        this.homeService.changeBackgroundColor.subscribe(value => {
            this.theme=value;  
        });
    } 

    ngOnInit() {
 
    }
 
    

}