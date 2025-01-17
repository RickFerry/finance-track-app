import { Component } from '@angular/core';

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

  constructor(private service: PessoaService) {}

  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.service.pesquisar(this.filtro).then((pess) => {
      this.totalRegistros = pess.totalElements;
      this.pessoas = pess.content;
    });
  }

  aoMudarPagina($event: any): void {
    const pagina = $event.first / $event.rows;
    this.pesquisar(pagina);
  }
}
