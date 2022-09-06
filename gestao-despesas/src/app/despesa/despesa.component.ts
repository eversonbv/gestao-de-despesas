import { PaymentTypeStorageService } from '../formas-pagamento/paymentType-storage.service';
import { PaymentType } from './../model/paymentType';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Expense } from '../model/expense';
import { NavigationExtras, Router } from '@angular/router';
import { TipoDespesaService } from '../tipos-despesa/tipos-despesa.service';
import { DespesaService } from './despesa.service';
import { ExpenseType } from '../model/expenseType';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css'],
})
export class DespesaComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  expense!: Expense;
  listaDespesas?: Expense[];
  listaFormasPagamento!: PaymentType[];
  listaTiposDespesa!: ExpenseType[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(
    private despesaService: DespesaService,
    private paymentTypeService: PaymentTypeStorageService,
    private expenseTypeService: TipoDespesaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.expense = new Expense(Math.round(Math.random() * 1000), new Date(), '', 0, 0, 0);
    this.listarFormasPagamento();
    this.listarTiposDespesas();
    this.listarTodos();
  }

  listarFormasPagamento() {
    this.paymentTypeService.getPaymentTypes().subscribe(
      (response) => {
        this.listaFormasPagamento = response as Expense[];
      },
      (error) => {}
    );
  }

  listarTiposDespesas() {
    this.expenseTypeService.getExpenseTypes().subscribe(
      (response) => {
        this.listaTiposDespesa = response as Expense[];
      },
      (error) => {}
    );
  }

  listarTodos() {
    this.despesaService.list().subscribe(
      (response) => {
        this.listaDespesas = response as Expense[];
      },
      (error) => {}
    );
  }

  retornarDescrFormaPagamento(id: number): string {
    let retorno: string = "";
    for (let fp of this.listaFormasPagamento) {
      if (fp.id?.valueOf() == id?.valueOf()) {
        retorno = fp.description;
        break;
      }
    }
    return retorno;
  }

  retornarDescrTipoDespesa(id: number): string {
    let retorno: string = "";
    for (let td of this.listaTiposDespesa) {
      if (td.id?.valueOf() == id?.valueOf()) {
        retorno = td.description;
        break;
      }
    }
    return retorno;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.despesaService.isExist(this.expense.id)) {
      this.despesaService.create(this.expense).subscribe(
        (response) => {
          this.listarTodos();
        },
        (error) => {}
      );
    } else {
      this.despesaService.update(this.expense.id, this.expense).subscribe(
        (response) => {
          this.listarTodos();
        },
        (error) => {}
      );
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Despesa lançada com sucesso!';

    this.form.reset();
    this.expense = new Expense(Math.round(Math.random() * 1000), new Date(), '', 0, 0, 0);

    this.listarTodos();
  }

  onDetail(id: number, date: Date, description: string, value: number, paymentTypeId: number, expenseTypeId: number){

    let formaPagamento = this.retornarDescrFormaPagamento(paymentTypeId);
    let tipoDespesa = this.retornarDescrTipoDespesa(expenseTypeId);
    this.router.navigate(['/despesa/detalhes', id, date, description, value, paymentTypeId, formaPagamento, expenseTypeId, tipoDespesa]);
  }

  onEdit(expense: Expense) {
    let clone = Expense.clone(expense);
    this.expense = clone;
  }

  onDelete(id: number, description: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover esta despesa ' + description
    );
    if (!confirmation) {
      return;
    }
    this.despesaService.delete(id).subscribe(
      (response) => {
        this.listarTodos();
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
