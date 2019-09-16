import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        "path": "",
        "component": HomeComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "home",
                "loadChildren":".\/dashboard\/container\/container.module"
            },
            {
                "path": "news-list",
                "loadChildren":".\/dashboard\/newsList\/newsList.module"
            }, 
            // {
            //     "path": "404",
            //     "loadChildren": ".\/dashboard\/default\/not-found\/not-found.module#NotFoundModule"
            // },
            {
                "path": "",
                "redirectTo": "home",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "**",
        "redirectTo": "home",//404
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }