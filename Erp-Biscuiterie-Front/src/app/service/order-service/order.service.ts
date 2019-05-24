import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'https://localhost:5001/api/order/';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }

  getOrderById(orderId: number): Observable<Order> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<Order>(this.url + orderId.toString(), httpOptions)
    .pipe(
      tap(_ => console.log(`fetched order id=${orderId}`)),
      catchError(this.handleError<Order>(`getOrder id=${orderId}`))
    );
  }

  createOrder(order: Order): Observable<Order> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Order>(this.url, order, httpOptions);
  }

  updateOrder(order: Order): Observable<Order> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const orderId = order.id;

    return this.http.put<Order>(this.url + orderId.toString(), order, httpOptions);
  }

  deleteOrder(orderId: number): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete<number>(this.url + orderId.toString(), httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
