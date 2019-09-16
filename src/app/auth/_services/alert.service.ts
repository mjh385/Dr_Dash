import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Observable ,  Subject } from "rxjs";

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private _router: Router) {
        // clear alert message on route change
        _router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message|| 'عملیات با موفقیت انجام شد' });
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'danger', text: message || 'نام کاربری و یا رمز عبور اشتباه است' });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}