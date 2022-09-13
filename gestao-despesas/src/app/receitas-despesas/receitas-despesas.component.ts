import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { DespesaService } from '../despesa/despesa.service';
import { Revenue } from '../model/revenue';
import { Expense } from '../model/expense';
import { ReceitaService } from '../receita/receita.service';

@Component({
  selector: 'app-receitas-despesas',
  templateUrl: './receitas-despesas.component.html',
  styleUrls: ['./receitas-despesas.component.css'],
  providers: [ReceitaService, DespesaService]
})
export class ReceitasDespesasComponent implements OnInit {

  public totalReceitas: number = 0;
  public totalDespesas: number = 0;
  private listaReceitas?: Revenue[];
  private listaDespesas?: Expense[];
  public loading: boolean = true;
  barLoadChartOptions!: echarts.EChartsOption;
  pieLoadChartOptions!: echarts.EChartsOption;

  barChartOption: echarts.EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Receita', 'Despesa'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [0, 0],
        type: 'bar',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
  };

  pieChartOption: echarts.EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Receita', 'Despesa'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [0, 0],
        type: 'pie',
      },
    ],
    tooltip: {
    },
  };

  constructor(private receitaService: ReceitaService,
              private despesaService: DespesaService) {}

  ngOnInit(): void {
    this.listarReceitas();
    this.listarDespesas();
  }

  public calcularTotais() {
    this.totalReceitas = 0;
    this.totalDespesas = 0;
    if (this.listaReceitas != null) {
      for (let r of this.listaReceitas) {
        this.totalReceitas += r.value;
      }
    }
    if (this.listaDespesas != null) {
      for (let r of this.listaDespesas) {
        this.totalDespesas += r.value;
      }
    }

    this.barLoadChartOptions = {series: [{data: [this.totalReceitas, this.totalDespesas]}]}
    this.pieLoadChartOptions = {series: [{data: [this.totalReceitas, this.totalDespesas]}]}

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

}
