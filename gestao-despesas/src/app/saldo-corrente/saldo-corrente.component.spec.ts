import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoCorrenteComponent } from './saldo-corrente.component';

describe('SaldoCorrenteComponent', () => {
  let component: SaldoCorrenteComponent;
  let fixture: ComponentFixture<SaldoCorrenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaldoCorrenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaldoCorrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
