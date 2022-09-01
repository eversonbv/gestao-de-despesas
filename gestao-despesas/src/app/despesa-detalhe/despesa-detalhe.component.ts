import { DespesaService } from './../despesa/despesa.service';
import { ExpenseTypeStorageService } from './../formas-pagamento/expenseType-storage.service';
import { ExpenseType } from './../model/expenseType';
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
  expenseTypes!: ExpenseType[];
  expenseTypeDescription!: String;
  handleUpdateResponse: any;

  constructor(
    private route: ActivatedRoute,
    private despesaService: DespesaService,
    private expenseTypeService: ExpenseTypeStorageService,
  ) {}

  ngOnInit(): void {
    let idParam: number = + this.route.snapshot.paramMap.get('id')!;
    let descriptionParam: string = this.route.snapshot.paramMap.get('description')!;
    let valueParam: number = + this.route.snapshot.paramMap.get('value')!;
    let expenseTypeId: number = + this.route.snapshot.paramMap.get('expenseTypeId')!;
    let expenseTypeDescr: string = this.route.snapshot.paramMap.get('expenseTypeDescription')!;

    this.expense = new Expense(idParam, descriptionParam, valueParam, expenseTypeId);
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
    this.expenseTypeService.getExpenseTypes().subscribe(
      (response) => {
        this.expenseTypes = response as ExpenseType[];
      },
      (error) => {}
    );
  }

}
