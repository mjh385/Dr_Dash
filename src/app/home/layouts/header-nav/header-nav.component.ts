import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HomeService } from '../../homeService';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";


declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
 
    public modalRef: NgbModalRef; 
    public dashboardData: any; 
    public newBackground = this.homeService.backgroundColor;
    public newCurrentDashboard = this.homeService.currentDashboard;
    public IsFullScreen:boolean = false;
    public selectedDashboard :object;
    constructor(public homeService: HomeService , private dashboardService: DashboardService , private modalService: NgbModal) { 
        this.homeService.changeBackgroundColor.subscribe(value => { 
            this.newBackground=value;  
        }); 
        
        this.homeService.changeCurrentDashboard.subscribe(value => { 
            this.newCurrentDashboard=value;  
        });  
    }
  


    ngOnInit() {  
        this.dashboardData = this.dashboardService;
    }
    
    ngAfterViewInit() { 
        mLayout.initHeader(); 
    } 
     
    toggleFullScreen() {  
        if(this.IsFullScreen){
            this.IsFullScreen = false; 
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if ((document as any).mozExitFullScreen) {
                (document as any).mozExitFullScreen();
            } else if ((document as any).msExitFullScreen) {
                (document as any).msExitFullScreen();
            }  
        } 
        else { 
            this.IsFullScreen = true;  
            let elem =  document.body;   
            let methodToBeInvokedOpen = elem['requestFullscreen'] ||  elem['webkitRequestFullScreen'] || elem['mozRequestFullscreen'] ||   elem['msRequestFullscreen']; 
            if(methodToBeInvokedOpen){ 
                methodToBeInvokedOpen.call(elem); 
            } 
        }  
    } 
    
    changeSelectedDashboard(dashbboardId){
        this.dashboardService.changeSelectedDashboard(dashbboardId); 

        $('#dashboardListTitle').trigger('click');
    }
    
    updateDashboard(dashboard){
        this.dashboardService.updateDashboard(dashboard).subscribe(
            data => {
                if (data) {
                    this.modalClose();
                }
            },
            error => {
                console.log(error.originalError._body)
                this.modalClose();
            }
        );
    }

    removeDashboard(dashboard){
        this.dashboardService.removeDashboard(dashboard._id).subscribe(
            data => {
                if (data) {
                    this.modalClose();
                }
            },
            error => {
                console.log(error.originalError._body)
                this.modalClose();
            }
        );
    }

    showDashboardConfig(dashboardEditBox,item){ 
        this.selectedDashboard = item;
        this.modalOpen(dashboardEditBox) 
    }

    modalOpen(content) {
        this.modalRef = this.modalService.open(content, { size: 'lg' });
    }
    
    modalClose(){
        this.modalRef.close()
    }

}