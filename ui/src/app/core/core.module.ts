import { CommonModule } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { LancamentoService } from '../lancamentos/Lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [CommonModule, ToastModule, ConfirmDialogModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent, ToastModule, ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'pt-BR' },
  ],
})
export class CoreModule {}
