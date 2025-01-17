import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { LancamentoFiltro, LancamentoService } from '../Lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent {
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid: any;

  constructor(
    private service: LancamentoService,
    private msgService: MessageService,
    private confirm: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {}

  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.service
      .pesquisar(this.filtro)
      .then((lanc) => {
        this.totalRegistros = lanc.totalElements;
        this.lancamentos = lanc.content;
      })
      .catch((error) => this.errorHandler.handler(error));
  }

  excluir(lancamento: any): void {
    this.confirm.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.service
          .excluir(lancamento.codigo)
          .then(() => {
            this.msgService.add({
              severity: 'success',
              summary: 'Lançamento excluído com sucesso!',
            });
            this.grid.reset();
          })
          .catch((error) => this.errorHandler.handler(error));
      },
    });
  }

  aoMudarPagina($event: LazyLoadEvent): void {
    const pagina = $event.first / $event.rows;
    this.pesquisar(pagina);
  }
}
