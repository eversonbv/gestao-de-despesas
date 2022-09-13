import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Constants } from 'src/app/util/constants';
import { Injectable } from '@angular/core';
import { User } from './../model/user';
import { WebStorageUtil } from 'src/app/util/web-storage-util';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url;
    let loggedIn = WebStorageUtil.get(Constants.LOGGED_IN_KEY) as boolean;

    if (!loggedIn) {
      this.router.navigateByUrl('/nao-autorizado');
      return false;
    }
    return true;
  }
}
