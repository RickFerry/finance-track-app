import { CommonModule } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { CategoriaService } from '../categorias/categoria.service';
import { LancamentoService } from '../lancamentos/Lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { AuthService } from '../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule,
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  exports: [NavbarComponent, ToastModule, ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    CategoriaService,
    AuthService,
    MessageService,
    ConfirmationService,
    Title,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'pt-BR' },
  ],
})
export class CoreModule {}
