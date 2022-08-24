import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IConfig, NgxMaskModule } from 'ngx-mask';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
