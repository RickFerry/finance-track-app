import { Component, OnInit } from '@angular/core';

import { LancamentoService } from '../Lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent implements OnInit {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  lancamentos = [];

  constructor(private service: LancamentoService) {}

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    const filtro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim,
    };

    this.service.pesquisar(filtro).then((lanc) => {
      this.lancamentos = lanc.content;
    });
  }
}
