export class User {
  id!: string;
  name?: string;
  login: string;
  password: string;
  balance: number;

  constructor(login: string, password: string) {
    this.id = String(Math.round(Math.random() * 10000));
    this.login = login;
    this.password = password;
    this.balance = 0;
  }

}
