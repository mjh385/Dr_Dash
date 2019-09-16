import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container.component';
import { LayoutModule } from '../../layouts/layout.module';
import { DashboardComponent } from '../dashboard.component';


//import { WidgetLoaderModule } from '../component/widgetLoader.module';
 

const routes: Routes = [
    {
        "path": "",
        "component": DashboardComponent,
        "children": [
            {
                "path": "",
                "component": ContainerComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
    ], providers: [ 
    ], exports: [
        RouterModule
    ], declarations: [
        ContainerComponent
    ]
})
export default class ContainerModule {



}