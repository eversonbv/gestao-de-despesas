export class Transaction {
  static readonly EXPENSE_TYPE = 'expense';
  static readonly REVENUE_TYPE = 'revenue';
  public date: Date;
  public id: number;
  public userId!: string;
  constructor(public value: number, public type: string) {
    this.id = Math.round(Math.random() * 1000);
    this.value = value;
    this.type = type;
    this.date = new Date();
  }
}
