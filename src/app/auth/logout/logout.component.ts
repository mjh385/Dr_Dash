import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from '../_services/user.service';

import { Helpers } from "../../helpers";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class LogoutComponent implements OnInit {

    constructor(private _router: Router,
        private _userService: UserService) {
    }

    ngOnInit(): void {
        Helpers.setLoading(true);
        // reset login status
        this._userService.logout();
        this._router.navigate(['/login']);
    }
}