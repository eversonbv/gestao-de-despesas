export class Revenue {
  public id?: number;
  public description: string;
  public value: number;

  constructor(description: string, value: number) {
    this.description = description;
    this.value = value;
  }

  public static toWS(revenue: Revenue) {
    let r: Revenue = new Revenue(revenue.description, revenue.value);
    r.description = revenue.description;
    r.value = revenue.value;
    return r;
  }
}
