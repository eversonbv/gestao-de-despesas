export class PaymentType {
  id?: number;
  description?: string;

  constructor(o: PaymentType = {} as PaymentType) {
    let { id = undefined, description = undefined } = o;

    this.id = id;
    this.description = description;
  }
}
