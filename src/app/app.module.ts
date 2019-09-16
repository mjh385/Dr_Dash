import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from './home/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";
import { HomeRoutingModule } from "./home/home-routing.module";
import { AuthModule } from "./auth/auth.module";
import { FormsModule } from '@angular/forms';
import { HomeService } from './home/homeService'; 
import { DashboardService, WidgetService , WidgetAccountService } from './home/dashboard/services';

@NgModule({
    declarations: [
        HomeComponent,
        AppComponent,
    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HomeRoutingModule,
        AuthModule,
        FormsModule,
    ],
    providers: [
        ScriptLoaderService,
        HomeService,
        DashboardService,
        WidgetService,
        WidgetAccountService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }