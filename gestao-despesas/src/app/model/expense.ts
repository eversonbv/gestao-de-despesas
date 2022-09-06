export class Expense {
  public id: number;
  public date: Date;
  public description: string;
  public value: number;
  public paymentTypeId: number;
  public expenseTypeId: number;

  constructor(id: number, date: Date, description: string, value: number, expenseTypeId: number, paymentTypeId: number) {

    this.id = id;
    this.date = date;
    this.description = description;
    this.value = value;
    this.expenseTypeId = expenseTypeId;
    this.paymentTypeId = paymentTypeId;

    }

    public static clone(expense: Expense) {
      let e: Expense = new Expense(expense.id, expense.date, expense.description, expense.value,
                          expense.expenseTypeId, expense.paymentTypeId);
      return e;
    }
}

function DisplayFormat(arg0: string, arg1: boolean) {
  throw new Error("Function not implemented.");
}

