import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Expense } from '../model/expense';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  apiUrl: string = 'http://localhost:3000/expenses';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  expenses!: Expense[];

  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data).pipe(catchError(this.handleError));
  }

  list(): Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }

  isExist(value: number): boolean {
    this.list().subscribe((response) => {
      this.expenses = response as Expense[];
    });
    if (this.expenses == null) return false;
    for (let e of this.expenses) {
      if (e.id?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  update(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<Expense> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .delete<Expense>(API_URL, { headers: this.headers })
      .pipe(catchError(this.handleError));
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
