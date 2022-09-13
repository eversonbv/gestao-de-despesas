import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-saldo-corrente',
  templateUrl: './saldo-corrente.component.html',
  styleUrls: ['./saldo-corrente.component.css']
})
export class SaldoCorrenteComponent implements OnInit, OnChanges {

  @Input() value: number = 0;
  @Output() saldoPositivoEvento = new EventEmitter<boolean>();
  backgroundColor = 'blue';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.value < 0)
      setTimeout(() => {
        this.saldoPositivoEvento.emit(true);
      }, 2000);
  }

}
