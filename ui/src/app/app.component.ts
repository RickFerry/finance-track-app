import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  lancamentos = [
    {
      tipo: 'DESPESA',
      descricao: 'Compra de pão',
      dataVencimento: new Date(2021, 1, 1),
      dataPagamento: null,
      valor: 4.55,
      pessoa: 'Padaria do José',
    },
    {
      tipo: 'RECEITA',
      descricao: 'Venda de software',
      dataVencimento: new Date(2021, 1, 10),
      dataPagamento: new Date(2021, 1, 5),
      valor: 80000,
      pessoa: 'Atacado Brasil',
    },
    {
      tipo: 'DESPESA',
      descricao: 'Impostos',
      dataVencimento: new Date(2021, 2, 20),
      dataPagamento: null,
      valor: 14312,
      pessoa: 'Governo',
    },
    {
      tipo: 'DESPESA',
      descricao: 'Mensalidade escolar',
      dataVencimento: new Date(2021, 2, 5),
      dataPagamento: new Date(2021, 2, 6),
      valor: 400,
      pessoa: 'Escola Raio de Sol',
    },
    {
      tipo: 'RECEITA',
      descricao: 'Venda de carro',
      dataVencimento: new Date(2021, 2, 10),
      dataPagamento: null,
      valor: 20000,
      pessoa: 'Sebastião Souza',
    },
  ];
}
