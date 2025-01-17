import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

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
    private confirm: ConfirmationService
  ) {}

  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.service.pesquisar(this.filtro).then((lanc) => {
      this.totalRegistros = lanc.totalElements;
      this.lancamentos = lanc.content;
    });
  }

  excluir(lancamento: any): void {
    this.confirm.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.service.excluir(lancamento.codigo).then(() => {
          this.msgService.add({
            severity: 'success',
            summary: 'Lançamento excluído com sucesso!',
          });
          this.grid.reset();
        });
      },
    });
  }

  aoMudarPagina($event: LazyLoadEvent): void {
    const pagina = $event.first / $event.rows;
    this.pesquisar(pagina);
  }
}
