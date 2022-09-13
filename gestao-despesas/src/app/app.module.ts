import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { LandPageComponent } from './land-page/land-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { FormasPagamentoComponent } from './formas-pagamento/formas-pagamento.component';
import { ReceitaComponent } from './receita/receita.component';
import { SaldoCorrenteComponent } from './saldo-corrente/saldo-corrente.component';
import { ModalComponent } from './modal/modal.component';
import { NotAuthorizedComponent } from './notauthorized/notauthorized.component';
import { DespesaComponent } from './despesa/despesa.component';
import { DespesaDetalheComponent } from './despesa-detalhe/despesa-detalhe.component';
import { TiposDespesaComponent } from './tipos-despesa/tipos-despesa.component';
import { ReceitasDespesasComponent } from './receitas-despesas/receitas-despesas.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    LandPageComponent,
    PageNotFoundComponent,
    LoginComponent,
    FormasPagamentoComponent,
    ReceitaComponent,
    SaldoCorrenteComponent,
    ModalComponent,
    NotAuthorizedComponent,
    DespesaComponent,
    DespesaDetalheComponent,
    TiposDespesaComponent,
    ReceitasDespesasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgSelectModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
