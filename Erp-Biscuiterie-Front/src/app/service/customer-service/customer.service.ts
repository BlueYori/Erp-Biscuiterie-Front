import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = 'https://localhost:5001/api/customer/';

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }

  getCustomerById(customerId: number): Observable<Customer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<Customer>(this.url + customerId.toString(), httpOptions)
    .pipe(
      tap(_ => console.log(`fetched customer id=${customerId}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${customerId}`))
    );
  }

  createCustomer(customer: Customer): Observable<Customer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Customer>(this.url, customer, httpOptions);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const customerId = customer.id;

    return this.http.put<Customer>(this.url + customerId.toString(), customer, httpOptions);
  }

  deleteCustomer(customerId: number): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete<number>(this.url + customerId.toString(), httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
