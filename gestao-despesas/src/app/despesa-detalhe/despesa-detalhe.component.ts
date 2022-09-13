import { DespesaService } from './../despesa/despesa.service';
import { PaymentTypeStorageService } from '../formas-pagamento/paymentType-storage.service';
import { PaymentType } from './../model/paymentType';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Expense } from '../model/expense';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-despesa-detalhe',
  templateUrl: './despesa-detalhe.component.html',
  styleUrls: ['./despesa-detalhe.component.css'],
})
export class DespesaDetalheComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  expense!: Expense;
  listaDespesas!: Expense[];
  paymentTypes!: PaymentType[];
  paymentTypeDescription!: String;
  expenseTypeDescription!: String;
  handleUpdateResponse: any;

  constructor(
    private route: ActivatedRoute,
    private despesaService: DespesaService,
    private paymentTypeService: PaymentTypeStorageService,
  ) {}

  ngOnInit(): void {
    let idParam: number = + this.route.snapshot.paramMap.get('id')!;
    let dateParam: string = this.route.snapshot.paramMap.get('date')!;
    let descriptionParam: string = this.route.snapshot.paramMap.get('description')!;
    let valueParam: number = + this.route.snapshot.paramMap.get('value')!;
    let paymentTypeId: number = + this.route.snapshot.paramMap.get('paymentTypeId')!;
    let paymentTypeDescr: string = this.route.snapshot.paramMap.get('paymentTypeDescription')!;
    let expenseTypeId: number = + this.route.snapshot.paramMap.get('expenseTypeId')!;
    let expenseTypeDescr: string = this.route.snapshot.paramMap.get('expenseTypeDescription')!;

    this.expense = new Expense(idParam, new Date(dateParam + " GMT-0300"), descriptionParam, valueParam, expenseTypeId, paymentTypeId);
    this.paymentTypeDescription = paymentTypeDescr;
    this.expenseTypeDescription = expenseTypeDescr;

  }

  listarDespesas() {
    this.despesaService.list().subscribe(
      (response) => {
        this.listaDespesas = response as Expense[];
      },
      (error) => {}
    );
  }

  listarFormasPagamento() {
    this.paymentTypeService.getPaymentTypes().subscribe(
      (response) => {
        this.paymentTypes = response as PaymentType[];
      },
      (error) => {}
    );
  }

}
