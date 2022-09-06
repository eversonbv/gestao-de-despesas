export class PaymentType {
  id: number;
  description: string;

  constructor(id: number, description: string) {
    this.id = id;
    this.description = description;
  }

  public static clone(paymentType: PaymentType) {
    let et: PaymentType = new PaymentType(paymentType.id, paymentType.description);
    return et;
  }

}
