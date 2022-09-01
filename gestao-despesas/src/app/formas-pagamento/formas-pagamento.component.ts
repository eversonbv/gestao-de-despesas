import { ExpenseType } from './../model/expenseType';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExpenseTypeStorageService } from './expenseType-storage.service';
import { Shared } from '../util/shared';

@Component({
  selector: 'app-formas-pagamento',
  templateUrl: './formas-pagamento.component.html',
  styleUrls: ['./formas-pagamento.component.css'],
  providers: [ExpenseTypeStorageService],
})
export class FormasPagamentoComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  expenseType!: ExpenseType;
  expenseTypes?: ExpenseType[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private expenseTypeService: ExpenseTypeStorageService) { }

  ngOnInit(): void {
    this.expenseType = new ExpenseType(Math.round(Math.random() * 1000), '');
    this.listarFormasPagamento();
  }

  listarFormasPagamento() {
    this.expenseTypeService.getExpenseTypes().subscribe(
      (response) => {
        this.expenseTypes = response as ExpenseType[];
      },
      (error) => {}
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.expenseTypeService.isExist(this.expenseType.id)) {
      this.expenseTypeService.save(this.expenseType).subscribe(
        (response) => {
          this.listarFormasPagamento();
        },
        (error) => {}
      );
    } else {
      this.expenseTypeService.update(this.expenseType.id, this.expenseType).subscribe(
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
    this.expenseType = new ExpenseType(Math.round(Math.random() * 1000), '');

    this.listarFormasPagamento();

  }

  onEdit(expenseType: ExpenseType) {
    let clone = ExpenseType.clone(expenseType);
    this.expenseType = clone;
  }

  onDelete(id: number, description: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover a forma de pagamento ' + description
    );
    if (!confirmation) {
      return;
    }
    this.expenseTypeService.delete(id).subscribe(
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
