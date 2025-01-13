import { Component, OnInit } from '@angular/core';

import { LancamentoService } from '../Lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent implements OnInit {
  lancamentos = [];

  constructor(private service: LancamentoService) {}

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    this.service.pesquisar().then(() => null);
  }
}
