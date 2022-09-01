import { ExpenseTypeStorageService } from './../formas-pagamento/expenseType-storage.service';
import { ExpenseType } from './../model/expenseType';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Expense } from '../model/expense';
import { DespesaService } from './despesa.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css'],
})
export class DespesaComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  expense!: Expense;
  listaDespesas?: Expense[];
  listaFormasPagamento!: ExpenseType[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(
    private despesaService: DespesaService,
    private expenseTypeService: ExpenseTypeStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.expense = new Expense(Math.round(Math.random() * 1000), '', 0, 0);
    this.listarFormasPagamento();
    this.listarTodos();
  }

  listarFormasPagamento() {
    this.expenseTypeService.getExpenseTypes().subscribe(
      (response) => {
        this.listaFormasPagamento = response as Expense[];
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
    this.expense = new Expense(Math.round(Math.random() * 1000), '', 0, 0);

    this.listarTodos();
  }

  onDetail(id: number, description: string, value: number, expenseTypeId: number){

    let formaPagamento = this.retornarDescrFormaPagamento(expenseTypeId);
    this.router.navigate(['/despesa/detalhes', id, description, value, expenseTypeId, formaPagamento]);
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
