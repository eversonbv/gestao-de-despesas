import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { SaldoCorrenteComponent } from '../saldo-corrente/saldo-corrente.component';
import { WebStorageUtil } from '../util/web-storage-util';
import { Constants } from '../util/constants';
import { User } from '../model/user';
import { Shared } from '../util/shared';
import { NgForm } from '@angular/forms';
import { Revenue } from '../model/revenue';
import { ReceitaService } from './receita.service';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css'],
})
export class ReceitaComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  revenue!: Revenue;
  listaReceitas?: Revenue[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private receitaService: ReceitaService) {}

  ngOnInit(): void {
    this.revenue = new Revenue(Math.round(Math.random() * 1000), new Date(), '', 0);
    this.listarReceitas();
  }


  listarReceitas() {
    this.receitaService.list().subscribe(
      (response) => {
        this.listaReceitas = response as Revenue[];
      },
      (error) => {console.log('erro: ', error)}
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.receitaService.isExist(this.revenue.id)) {
      this.receitaService.create(this.revenue).subscribe(
        (response) => {
          this.listarReceitas();
        },
        (error) => {}
      );
    } else {
      this.receitaService.update(this.revenue.id, this.revenue).subscribe(
        (response) => {
          this.listarReceitas();
        },
        (error) => {}
      );
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Receita lançada com sucesso!';

    this.form.reset();
    this.revenue = new Revenue(Math.round(Math.random() * 1000), new Date(), '', 0);

    this.listarReceitas();
  }

  onResetClick() {
    this.form.reset();
    this.revenue = new Revenue(Math.round(Math.random() * 1000), new Date(), '', 0);
  }

  onEdit(revenue: Revenue) {
    let clone = Revenue.clone(revenue);
    this.revenue = clone;
  }

  onDelete(id: number, description: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover esta receita ' + description
    );
    if (!confirmation) {
      return;
    }
    this.receitaService.delete(id).subscribe(
      (response) => {
        this.listarReceitas();
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
