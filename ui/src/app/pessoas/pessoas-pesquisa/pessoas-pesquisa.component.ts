import { Component } from '@angular/core';

import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
})
export class PessoasPesquisaComponent {
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

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
        this.service.excluir(Pessoa.codigo).then(() => {
          this.msgService.add({
            severity: 'success',
            summary: 'Pessoa excluída com sucesso!',
          });
          this.pesquisar();
        });
      },
    });
  }

  aoMudarPagina($event: any): void {
    const pagina = $event.first / $event.rows;
    this.pesquisar(pagina);
  }
}
