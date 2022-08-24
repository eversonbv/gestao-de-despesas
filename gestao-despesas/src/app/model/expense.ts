import { ExpenseType } from './ExpenseType';

export class Expense {
  public id?: number;
  public description: string;
  public value: number;

  constructor(description: string, value: number, public expenseType?: ExpenseType) {
    if (expenseType == undefined) {
      this.expenseType = new ExpenseType({});
    }
    this.description = description;
    this.value = value;

  }

}
