import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
})
export class PessoasPesquisaComponent {
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid: any;

  constructor(
    private service: PessoaService,
    private msgService: MessageService,
    private confirm: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {}

  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.service.pesquisar(this.filtro).then((pess) => {
      this.totalRegistros = pess.totalElements;
      this.pessoas = pess.content;
    });
  }

  excluir(Pessoa: any) {
    this.confirm.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.service
          .excluir(Pessoa.codigo)
          .then(() => {
            this.msgService.add({
              severity: 'success',
              summary: 'Pessoa excluída com sucesso!',
            });
            this.grid.reset();
          })
          .catch((error) => this.errorHandler.handler(error));
      },
    });
  }

  mudarStatus(pessoa: any): void {
    const novoStatus = !pessoa.status;

    this.service
      .mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.status = novoStatus;
        this.msgService.add({
          severity: 'success',
          summary: `Pessoa ${acao} com sucesso!`,
        });
      })
      .catch((error) => this.errorHandler.handler(error));
  }

  aoMudarPagina($event: any): void {
    const pagina = $event.first / $event.rows;
    this.pesquisar(pagina);
  }
}
