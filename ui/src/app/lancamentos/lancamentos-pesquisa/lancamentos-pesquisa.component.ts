import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { LancamentoFiltro, LancamentoService } from '../Lancamento.service';
import { Lancamento } from 'src/app/core/model';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid: any;

  constructor(
    private service: LancamentoService,
    private msgService: MessageService,
    private confirm: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos');
  }

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

  excluir(lancamento: Lancamento): void {
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

  trocarTitulo() {
    this.title.setTitle('Novo Lançamento');
  }
}
