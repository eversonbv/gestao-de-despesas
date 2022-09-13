import { Component, OnInit, ViewChild } from '@angular/core';
import { DespesaService } from '../despesa/despesa.service';
import { Revenue } from '../model/revenue';
import { Expense } from '../model/expense';
import { ReceitaService } from '../receita/receita.service';
import { SaldoCorrenteComponent } from '../saldo-corrente/saldo-corrente.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css'],
  providers: [ReceitaService, DespesaService],
})
export class LandPageComponent implements OnInit {
  public isHidePanel = false;
  public imageURL : string = 'https://placeimg.com/600/300/tech';
  public value: number = 0;
  public listaReceitas?: Revenue[];
  public listaDespesas?: Expense[];
  public loading: boolean = true;

  @ViewChild(SaldoCorrenteComponent)
  saldoCorrenteComponent!: SaldoCorrenteComponent;

  public modal = {
    show: false,
    title: '',
    text: '',
  };

  constructor(private receitaService: ReceitaService,
              private despesaService: DespesaService) {}

    ngOnInit(): void {
    this.listarReceitas();
    this.listarDespesas();
    //this.calcularSaldoAtual();
  }

  public calcularSaldoAtual() {
    let totalReceitas: number = 0;
    let totalDespesas: number = 0;
    if (this.listaReceitas != null) {
      for (let r of this.listaReceitas) {
        totalReceitas += r.value;
      }
    }
    if (this.listaDespesas != null) {
      for (let r of this.listaDespesas) {
        totalDespesas += r.value;
      }
    }
    this.value = totalReceitas - totalDespesas;
  }

  private listarReceitas() {
    this.receitaService.list().subscribe(
      (response) => {
        this.listaReceitas = response as Revenue[];
        this.loading = false;
      },
      (error) => {}
    );
  }

  private listarDespesas() {
    this.despesaService.list().subscribe(
      (response) => {
        this.listaDespesas = response as Expense[];
      },
      (error) => {}
    );
  }

  getBackgroundImage() {
    return {
      'background-image':
        'linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .9)), url(' +
        this.imageURL +
        ')',
    };
  }

  onSaldoPositivoEvento(event: boolean) {
    this.modal.show = event;
    this.modal.title = 'Aviso!';
    this.modal.text = `Seu Saldo atual está Negativo!`;
  }

  onCloseModal() {
    this.modal.show = false;
  }

}
