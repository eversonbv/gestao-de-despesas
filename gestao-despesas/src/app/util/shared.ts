import { Constants } from './constants';
import { User } from '../model/user';

export class Shared {
  constructor() {}

  public static initializeWebStorage(): void {
    if (localStorage.getItem(Constants.LOGIN_KEY) != null) {
      return;
    }

    let user = new User(Constants.LOGIN_KEY, Constants.PASSWORD_KEY);

    localStorage.setItem(Constants.LOGIN_KEY, JSON.stringify(user));
    localStorage.setItem(Constants.EXPENSETYPE_KEY, JSON.stringify([]));

    localStorage.setItem(Constants.LOGGED_IN_KEY, String(false));
  }
}
