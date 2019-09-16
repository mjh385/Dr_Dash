import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HomeService } from '../../homeService';

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {

    public theme = this.homeService.backgroundColor;
    constructor(public homeService: HomeService ) {
        this.homeService.changeBackgroundColor.subscribe(value => {
            this.theme=value;  
        });
    } 
    
    ngOnInit() {

    }

}