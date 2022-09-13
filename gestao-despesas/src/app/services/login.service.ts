import { Observable, Observer, Subject } from 'rxjs';
import { Constants } from '../util/constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageUtil } from 'src/app/util/web-storage-util';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginSource = new Subject<boolean>();
  private loginUsuario = new Subject<string>();

  constructor(private router: Router) {}

  login() {
    WebStorageUtil.set(Constants.LOGGED_IN_KEY, true);
    this.loginSource.next(true);
    this.router.navigate(['/inicio']);
  }

  logout() {
    WebStorageUtil.set(Constants.LOGGED_IN_KEY, false);
    this.loginSource.next(false);
    this.router.navigate(['/login']);
  }

  asObservable(): Observable<boolean> {
    return this.loginSource;
  }

  asLoginUsuario(): Observable<string> {
    return this.loginUsuario;
  }

}
