import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from './role';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url = 'https://localhost:5001/api/role/';

  constructor(private http: HttpClient) { }

  getAllRole(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url);
  }

  getRoleById(roleId: number): Observable<Role> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<Role>(this.url + roleId.toString(), httpOptions)
    .pipe(
      tap(_ => console.log(`fetched  role id=${roleId}`)),
      catchError(this.handleError<Role>(`getRole id=${roleId}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
