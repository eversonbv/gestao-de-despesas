import * as M from 'materialize-css';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, } from '@angular/core';
import { LoginService } from '../services/login.service';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { Constants } from 'src/app/util/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  public loggedIn = false;
  subscription!: Subscription;
  @ViewChild('mobile') sideNav?: ElementRef;

  constructor(private loginService: LoginService) {
    this.subscription = loginService.asObservable().subscribe((data) => {
      this.loggedIn = data;
    });
  }

  ngOnInit(): void {
    this.loggedIn = WebStorageUtil.get(Constants.LOGGED_IN_KEY) as boolean;
  }

  ngAfterViewInit(): void {
    M.Sidenav.init(this.sideNav?.nativeElement);
  }

  onLogout() {
    this.loginService.logout();
  }
}
