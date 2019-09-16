import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { BadInput } from './common/bad-input';
import { NotFoundError } from './common/not-found-error';
import { AppError } from './common/app-error';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { User } from "../_models/index";
//const url='http://localhost:4000/api/v1.0';
const url ='https://young-tor-96166.herokuapp.com/api/v1.0'
@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

    verify() {
        return this.http.get(url + '/secure' , this.jwt());
    }

    forgotPassword(email: string) {
        return this.http.post('/api/forgot-password', JSON.stringify({ email }), this.jwt())
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }
 
    create(user: User) {
        return this.http.post(url + '/signup', JSON.stringify(user) , this.jwt())
        .map(response => response.json())
        .catch(this.handleError);
    }

    
    login(email: string, password: string) {        
         return this.http.post(url+'/login', JSON.stringify({ email: email, password: password }), this.jwt())
         .map(response => response.json())
         .catch(this.handleError);
     }
  
     logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
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