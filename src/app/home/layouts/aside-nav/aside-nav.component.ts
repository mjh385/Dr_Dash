import { Component, ViewChild, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { DashboardService, WidgetService } from '../../dashboard/services';
import { HomeService } from '../../homeService';

 
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit {
 
    constructor(private homeService: HomeService, private dashboardService: DashboardService, private widgetService: WidgetService, private modalService: NgbModal) {    
    }
    public modalRef: NgbModalRef;
    public newNews :object = {
        name:'',
        mehvar:'',
        atf:'',
        way:'',
        category:'',
        sath:'',
        place:'',
        date:'',
        time:'',
        for:'',
        title:'',
        text:'',
        reason:'',
    }


    ngOnInit() {  

    }
   

    
    addNews(addNews){

        //alert(JSON.stringify(addNews))
        this.modalClose();

        //  newDashboard['widgets'] = []; 
        // if(newDashboard.name==''){
        //     newDashboard.name='داشبورد جدید'
        // }

        // this.dashboardService.createDashboard(newDashboard).subscribe(
        //     data => {
        //         if (data) {
        //             var dashboardId = data.dashboardId;
        //             this.dashboardService.getAllDashboard().subscribe(
        //                 data => {
        //                     if (data) {
        //                         this.dashboardService.setDashboards(data.data, dashboardId);  
        //                         this.resetDoshboardTodefault();
        //                     }
        //                 },
        //                 error => {
        //                     console.log(error.originalError.err)
        //                 }
        //             );
        //         }
        //     },
        //     error => {
        //         console.log(error.originalError._body)
        //     }
        // );
    }
 

    modalOpen(content) {
        this.modalRef = this.modalService.open(content, { size: 'lg' });
    }
    
    modalClose(){
        this.modalRef.close()
    }

    selectTab(event, tabName) {
        //  if(!event)return;
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        event.target.className += " active";
    }



 
}