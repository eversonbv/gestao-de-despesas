export class Expense {
  public id: number;
  public description: string;
  public value: number;
  public expenseTypeId: number;

  constructor(id: number, description: string, value: number, expenseTypeId: number) {

    this.id = id;
    this.description = description;
    this.value = value;
    this.expenseTypeId = expenseTypeId;

    }

    public static clone(expense: Expense) {
      let e: Expense = new Expense(expense.id, expense.description, expense.value, expense.expenseTypeId);
      return e;
    }
}

