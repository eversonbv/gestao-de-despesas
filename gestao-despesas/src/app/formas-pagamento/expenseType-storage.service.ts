import { BehaviorSubject, Observable } from 'rxjs';

import { Constants } from 'src/app/util/constants';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { ExpenseType } from '../model/expenseType';

@Injectable()
export class ExpenseTypeStorageService {
  expenseTypes!: ExpenseType[];
  private expenseTypeSource!: BehaviorSubject<number>;
  constructor() {
    this.expenseTypes = WebStorageUtil.get(Constants.EXPENSETYPE_KEY);
    this.expenseTypeSource = new
        BehaviorSubject<number>(this.expenseTypes != null ? this.expenseTypes.length : 0);
  }

  save(expenseType: ExpenseType) {
    this.expenseTypes = WebStorageUtil.get(Constants.EXPENSETYPE_KEY);
    this.expenseTypes.push(expenseType);
    WebStorageUtil.set(Constants.EXPENSETYPE_KEY, this.expenseTypes);
  }

  update(expenseType: ExpenseType) {
    this.expenseTypes = WebStorageUtil.get(Constants.EXPENSETYPE_KEY);
    this.delete(expenseType.id);
    this.save(expenseType);
  }

  delete(id: number): boolean {
    this.expenseTypes = WebStorageUtil.get(Constants.EXPENSETYPE_KEY);
    this.expenseTypes = this.expenseTypes.filter((e) => {
      return e.id?.valueOf() != id?.valueOf();
    });

    WebStorageUtil.set(Constants.EXPENSETYPE_KEY, this.expenseTypes);
    return true;
  }

  isExist(value: string): boolean {
    this.expenseTypes = WebStorageUtil.get(Constants.EXPENSETYPE_KEY);
    if (this.expenseTypes == null)
      return false;
    for (let e of this.expenseTypes) {
      if (e.description?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getExpenseTypes(): ExpenseType[] {
    this.expenseTypes = WebStorageUtil.get(Constants.EXPENSETYPE_KEY);
    return this.expenseTypes;
  }

  notifyTotalExpenseTypes() {
    this.expenseTypeSource.next(this.getExpenseTypes()?.length);
  }

  asObservable(): Observable<number> {
    return this.expenseTypeSource;
  }
}
