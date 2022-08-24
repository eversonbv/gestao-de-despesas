export class ExpenseType {
  id: number;
  description: string;

  constructor(id: number, description: string) {
    this.id = id;
    this.description = description;
  }

  public static clone(expenseType: ExpenseType) {
    let et: ExpenseType = new ExpenseType(expenseType.id, expenseType.description);
    return et;
  }

}
