import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Revenue } from '../model/revenue';

@Injectable({
  providedIn: 'root',
})
export class ReceitaService {
  apiUrl: string = 'http://localhost:3000/revenues';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  revenues!: Revenue[];

  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data).pipe(catchError(this.handleError));
  }

  list(): Observable<any>{
    return this.http.get(`${this.apiUrl}`).pipe(catchError(this.handleError));
  }

  isExist(value: number): boolean {
    this.list().subscribe((response) => {
      this.revenues = response as Revenue[];
    });
    if (this.revenues == null) return false;
    for (let e of this.revenues) {
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

  delete(id: number): Observable<Revenue> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .delete<Revenue>(API_URL, { headers: this.headers })
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
