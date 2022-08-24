import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { LoginService } from '../services/login.service';
import { Constants } from '../util/constants';
import { WebStorageUtil } from '../util/web-storage-util';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public loggedIn = false;
  public ano : number;
  public loginUsuario : string = "";
  private user! : User;
  subscription!: Subscription;
  constructor(private loginService: LoginService) {
    this.ano = new Date().getFullYear();
    this.subscription = loginService.asLoginUsuario().subscribe((data) => {
      this.loginUsuario = data;
    });
    this.subscription = loginService.asObservable().subscribe((data) => {
      this.loggedIn = data;
    });

  }

  ngOnInit(): void {
    this.loggedIn = WebStorageUtil.get(Constants.LOGGED_IN_KEY) as boolean;
    this.user = WebStorageUtil.get(Constants.LOGIN_KEY) as User;
    this.loginUsuario = this.user.login;
  }

}
