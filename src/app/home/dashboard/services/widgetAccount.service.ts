import { DataService } from './data.service';

import { Http } from "@angular/http";
import { Injectable} from '@angular/core';

const WidgetAccountUrl='http://localhost:4000/api/v1.0/widgetAccount';

@Injectable()
export class WidgetAccountService extends DataService {
    constructor(http: Http) {
        super(WidgetAccountUrl, http);
    }
    
    addWidgetAccount(id: string) {
        return this.create(id,{});
    }
    
    removeWidgetAccount(id: string){ 
        return this.remove(id);
    } 
     
    getAllWidgetAccount(id: string) {
        return this.getAll(id);
    } 
}










