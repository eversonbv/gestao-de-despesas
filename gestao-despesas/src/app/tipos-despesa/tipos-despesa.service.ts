import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

import { Constants } from 'src/app/util/constants';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { ExpenseType } from '../model/expenseType';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TipoDespesaService {
  apiUrl: string = 'http://localhost:3000/expensetypes';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  expenseTypes!: ExpenseType[];

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

  delete(id: number): Observable<ExpenseType> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .delete<ExpenseType>(API_URL, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  isExist(value: number): boolean {
    this.getExpenseTypes().subscribe((response) => {
      this.expenseTypes = response as ExpenseType[];
    });
    if (this.expenseTypes == null) return false;
    for (let et of this.expenseTypes) {
      if (et.id?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getExpenseTypes() {
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
