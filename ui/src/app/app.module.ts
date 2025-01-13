import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LancamentoService } from './lancamentos/Lancamento.service';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    HttpClientModule,
  ],

  providers: [LancamentoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
