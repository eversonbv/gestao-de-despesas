import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDespesaComponent } from './tipos-despesa.component';

describe('TiposDespesaComponent', () => {
  let component: TiposDespesaComponent;
  let fixture: ComponentFixture<TiposDespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposDespesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
