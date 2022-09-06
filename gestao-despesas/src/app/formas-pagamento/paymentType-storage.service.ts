import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

import { Constants } from 'src/app/util/constants';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { PaymentType } from '../model/paymentType';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentTypeStorageService {
  apiUrl: string = 'http://localhost:3000/paymenttypes';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  paymentTypes!: PaymentType[];

  constructor(private http: HttpClient) {}

  save(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data).pipe(catchError(this.handleError));
  }

  update(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<PaymentType> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .delete<PaymentType>(API_URL, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  isExist(value: number): boolean {
    this.getPaymentTypes().subscribe((response) => {
      this.paymentTypes = response as PaymentType[];
    });
    if (this.paymentTypes == null) return false;
    for (let et of this.paymentTypes) {
      if (et.id?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getPaymentTypes() {
    return this.http.get(`${this.apiUrl}`);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      console.error(
        `cod do erro no backend ${error.status}, ` + `mensagem: ${error.error}`
      );
    }
    return throwError(() => new Error('Ocorreu um erro.'));
  }
}
