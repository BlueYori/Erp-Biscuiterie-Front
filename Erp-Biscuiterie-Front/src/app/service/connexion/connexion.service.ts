import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

import {Connexion} from './Connexion';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ConnexionService {

  constructor(private http: HttpClient) { }

  
  private ConnectionAPI = "https://localhost:44386/api/user/sign-in";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  login(Username:string,Password:string): Observable<Connexion> {
      var Connexion = {                    
        email: Username,
        password: Password,
      }

      return this.http.post<Connexion>(this.ConnectionAPI,JSON.stringify(Connexion), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError));
  }  

  /*login(){
    //return this.http.post(this.ConnectionAPI+'/Employee',""); 
    return this.http.get(this.ConnectionAPI);
    //.toPromise().then(res => this.list = res as Employee[]);
   }*/

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
 }
  
}
