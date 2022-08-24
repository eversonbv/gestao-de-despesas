import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../util/constants';
import { WebStorageUtil } from '../util/web-storage-util';
import { User } from '../model/user';
import { LoginService } from './../services/login.service';
import { Shared } from './../util/shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  user!: User;
  loginUser!: User;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.loginUser = new User('', '');
    this.user = WebStorageUtil.get(Constants.LOGIN_KEY);
  }

  onLogin() {
    if (
      this.loginUser.login === this.user.login &&
      this.loginUser.password === this.user.password
    ) {
      this.loginService.login();
    } else {
      alert('Login e/ou Senha inválido.\nTente novamente!');
    }
  }
}
