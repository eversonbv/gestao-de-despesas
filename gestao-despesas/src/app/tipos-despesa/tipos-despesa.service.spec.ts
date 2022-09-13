import { TestBed } from '@angular/core/testing';

import { TiposDespesaService } from './tipos-despesa.service';

describe('TiposDespesaService', () => {
  let service: TiposDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposDespesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
