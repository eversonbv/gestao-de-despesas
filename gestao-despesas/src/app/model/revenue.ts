export class Revenue {
  public id: number;
  public date: Date;
  public description: string;
  public value: number;

  constructor(id: number, date: Date, description: string, value: number) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.value = value;
  }

  public static clone(revenue: Revenue) {
    let r: Revenue = new Revenue(revenue.id, revenue.date, revenue.description, revenue.value);
    return r;
  }
}
