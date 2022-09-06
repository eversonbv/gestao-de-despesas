import { PaymentType } from './../model/paymentType';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentTypeStorageService } from './paymentType-storage.service';
import { Shared } from '../util/shared';

@Component({
  selector: 'app-formas-pagamento',
  templateUrl: './formas-pagamento.component.html',
  styleUrls: ['./formas-pagamento.component.css'],
  providers: [PaymentTypeStorageService],
})
export class FormasPagamentoComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  paymentType!: PaymentType;
  paymentTypes?: PaymentType[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private paymentTypeService: PaymentTypeStorageService) { }

  ngOnInit(): void {
    this.paymentType = new PaymentType(Math.round(Math.random() * 1000), '');
    this.listarFormasPagamento();
  }

  listarFormasPagamento() {
    this.paymentTypeService.getPaymentTypes().subscribe(
      (response) => {
        this.paymentTypes = response as PaymentType[];
      },
      (error) => {}
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.paymentTypeService.isExist(this.paymentType.id)) {
      this.paymentTypeService.save(this.paymentType).subscribe(
        (response) => {
          this.listarFormasPagamento();
        },
        (error) => {}
      );
    } else {
      this.paymentTypeService.update(this.paymentType.id, this.paymentType).subscribe(
        (response) => {
          this.listarFormasPagamento();
        },
        (error) => {}
      );
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Forma de Pagamento cadastrada com sucesso!';

    this.form.reset();
    this.paymentType = new PaymentType(Math.round(Math.random() * 1000), '');

    this.listarFormasPagamento();

  }

  onEdit(paymentType: PaymentType) {
    let clone = PaymentType.clone(paymentType);
    this.paymentType = clone;
  }

  onDelete(id: number, description: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover a forma de pagamento ' + description
    );
    if (!confirmation) {
      return;
    }
    this.paymentTypeService.delete(id).subscribe(
      (response) => {
        this.listarFormasPagamento();
      },
      (error) => {}
    );
    let response: boolean = true;
    this.isShowMessage = true;
    this.isSuccess = response;
    if (response) {
      this.message = 'O item foi removido com sucesso!';
    } else {
      this.message = 'O item não pode ser removido!';
    }
  }
}
