import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { SaldoCorrenteComponent } from '../saldo-corrente/saldo-corrente.component';
import { WebStorageUtil } from '../util/web-storage-util';
import { Constants } from '../util/constants';
import { User } from '../model/user';
import { Shared } from '../util/shared';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css'],
})
export class ReceitaComponent implements OnInit, AfterViewInit {
  public value: number = 0;
  public description?: string;
  revenueInvalid = false;
  revenueMessage = '';
  user!: User;

  @ViewChild(SaldoCorrenteComponent)
  saldoCorrenteComponent!: SaldoCorrenteComponent;

  public modal = {
    show: false,
    title: '',
    text: '',
  };

  constructor() {}

  ngOnInit(): void {
    this.revenueMessage = '';
    Shared.initializeWebStorage();
    this.user = WebStorageUtil.get(Constants.LOGIN_KEY);
  }

  ngAfterViewInit(): void {
    console.log(`saldo Atual: ${this.saldoCorrenteComponent.value}`);
  }

  onSubmit() {
    this.revenueInvalid = false;
    this.user = WebStorageUtil.get(Constants.LOGIN_KEY);
    this.user.balance += this.value;
    WebStorageUtil.set(Constants.LOGIN_KEY, this.user);
    this.revenueMessage = `Depósito de R$ ${this.value.toFixed(2)} efetuado com sucesso!`;
  }

  onResetClick() {
    this.description = '';
    this.value = 0;
  }

  onSaldoPositivoEvento(event: boolean) {
    this.modal.show = event;
    this.modal.title = 'Aviso!';
    this.modal.text = `Seu Saldo atual está Positivo!`;
  }

  onCloseModal() {
    this.modal.show = false;
  }

}
