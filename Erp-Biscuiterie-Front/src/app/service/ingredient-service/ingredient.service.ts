import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  url = 'https://localhost:5001/api/ingredient/';

  constructor(private http: HttpClient) { }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.url);
  }

  getIngredientById(ingredientId: number): Observable<Ingredient> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<Ingredient>(this.url + ingredientId.toString(), httpOptions)
    .pipe(
      tap(_ => console.log(`fetched ingredient id=${ingredientId}`)),
      catchError(this.handleError<Ingredient>(`getIngredient id=${ingredientId}`))
    );
  }

  createIngredient(ingredient: Ingredient): Observable<Ingredient> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Ingredient>(this.url, ingredient, httpOptions);
  }

  updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const ingredientId = ingredient.id;

    return this.http.put<Ingredient>(this.url + ingredientId.toString(), ingredient, httpOptions);
  }

  deleteIngredient(ingredientId: number): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete<number>(this.url + ingredientId.toString(), httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
