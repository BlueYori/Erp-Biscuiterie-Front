import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { State } from './state';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  url = 'https://localhost:5001/api/state/';

  constructor(private http: HttpClient) { }

  getAllState(): Observable<State[]> {
    return this.http.get<State[]>(this.url);
  }

  getStateById(stateId: number): Observable<State> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<State>(this.url + stateId.toString(), httpOptions)
    .pipe(
      tap(_ => console.log(`fetched  state id=${stateId}`)),
      catchError(this.handleError<State>(`getState id=${stateId}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
