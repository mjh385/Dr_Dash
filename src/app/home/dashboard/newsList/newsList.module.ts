import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './newsList.component';
import { LayoutModule } from '../../layouts/layout.module';
import { DashboardComponent } from '../dashboard.component';
import { GridsterModule } from 'angular2gridster';
import { FormsModule } from '@angular/forms';
import { ChartLoaderModule } from '../component/base/chartLoader.module';
import { NgxGraphModule } from '@swimlane/ngx-graph' 

//import { WidgetLoaderModule } from '../component/widgetLoader.module';
 

const routes: Routes = [
    {
        "path": "",
        "component": DashboardComponent,
        "children": [
            {
                "path": "",
                "component": NewsListComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        FormsModule,
        GridsterModule,
        NgxGraphModule,
        ChartLoaderModule
       // WidgetLoaderModule, 
    ], providers: [ 
    ], exports: [
        RouterModule
    ], declarations: [
        NewsListComponent
    ]
})
export default class NewsListModule {

}