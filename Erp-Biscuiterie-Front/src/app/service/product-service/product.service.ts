import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'https://localhost:44386/api/product/';

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductById(productId: number): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<Product>(this.url + productId.toString(), httpOptions)
    .pipe(
      tap(_ => console.log(`fetched  product id=${productId}`)),
      catchError(this.handleError<Product>(`getProduct id=${productId}`))
    );
  }

  createProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Product>(this.url, product, httpOptions);
  }

  updateProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const productId = product.id;

    return this.http.put<Product>(this.url + productId.toString(), product, httpOptions);
  }

  deleteProduct(productId: number): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete<number>(this.url + productId.toString(), httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
