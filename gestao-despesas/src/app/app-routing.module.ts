import { DespesaDetalheComponent } from './despesa-detalhe/despesa-detalhe.component';
import { FormasPagamentoComponent } from './formas-pagamento/formas-pagamento.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandPageComponent } from './land-page/land-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReceitaComponent } from './receita/receita.component';
import { AuthenticationGuard } from './util/authentication.guard';
import { NotAuthorizedComponent } from './notauthorized/notauthorized.component';
import { DespesaComponent } from './despesa/despesa.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: LandPageComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'formas-pagamento', component: FormasPagamentoComponent },
  { path: 'receita', component: ReceitaComponent },
  { path: 'despesa/detalhes/:id/:description/:value/:expenseTypeId/:expenseTypeDescription', component: DespesaDetalheComponent },
  { path: 'despesa', component: DespesaComponent },
  { path: 'nao-autorizado', component: NotAuthorizedComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard],
})
export class AppRoutingModule {}
