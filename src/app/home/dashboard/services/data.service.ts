import { BadInput } from './common/bad-input';
import { NotFoundError } from './common/not-found-error';
import { AppError } from './common/app-error';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
    

  constructor(private url ,private http: Http) { }


    getAll(id) {
        return this.http.get(this.url + '/get-all/'+ id, this.jwt())
        .map(response => response.json())
        .catch(this.handleError);
    }

    getData(id, resource) {
        return this.http.post(this.url + '/get-data/'+ id, JSON.stringify(resource) , this.jwt())
        .map(response => response.json())
        .catch(this.handleError);
    }

    create(id, resource) {
        return this.http.post(this.url + '/create/' + id, JSON.stringify(resource), this.jwt())
        .map(response => response.json())
        .catch(this.handleError);
    }

    update(id , resource) {
        return this.http.post(this.url + '/update/' + id, JSON.stringify(resource), this.jwt())
        .map(response => response.json())      
        .catch(this.handleError);
    }

    remove(id) {
        return this.http.get(this.url + '/remove/' + id, this.jwt())
        .map(response => response.json())
        .catch(this.handleError);
    }


    
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }else{
            let headers = new Headers({'Content-Type': 'application/json'});
            return new RequestOptions({ headers: headers });
        }
    }
    
    private handleError(error: Response) {
        if (error.status === 400)
          return Observable.throw(new BadInput(error.json()));
      
        if (error.status === 404)
          return Observable.throw(new NotFoundError());
        
        return Observable.throw(new AppError(error));
    }
}