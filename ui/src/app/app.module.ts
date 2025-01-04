import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasModule } from './pessoas/pessoas.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, LancamentosModule, PessoasModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
