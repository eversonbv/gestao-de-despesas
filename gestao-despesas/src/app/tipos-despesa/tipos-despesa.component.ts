import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExpenseType } from '../model/expenseType';
import { TipoDespesaService } from './tipos-despesa.service';

@Component({
  selector: 'app-tipos-despesa',
  templateUrl: './tipos-despesa.component.html',
  styleUrls: ['./tipos-despesa.component.css']
})
export class TiposDespesaComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  expenseType!: ExpenseType;
  expenseTypes?: ExpenseType[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private expenseTypeService: TipoDespesaService) { }

  ngOnInit(): void {
    this.expenseType = new ExpenseType(Math.round(Math.random() * 1000), '');
    this.listarTiposDespesa();
  }

  listarTiposDespesa() {
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
          this.listarTiposDespesa();
        },
        (error) => {}
      );
    } else {
      this.expenseTypeService.update(this.expenseType.id, this.expenseType).subscribe(
        (response) => {
          this.listarTiposDespesa();
        },
        (error) => {}
      );
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Tipo de Despesa cadastrada com sucesso!';

    this.form.reset();
    this.expenseType = new ExpenseType(Math.round(Math.random() * 1000), '');

    this.listarTiposDespesa();

  }

  onEdit(expenseType: ExpenseType) {
    let clone = ExpenseType.clone(expenseType);
    this.expenseType = clone;
  }

  onDelete(id: number, description: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover o Tipo de Despesa ' + description
    );
    if (!confirmation) {
      return;
    }
    this.expenseTypeService.delete(id).subscribe(
      (response) => {
        this.listarTiposDespesa();
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
