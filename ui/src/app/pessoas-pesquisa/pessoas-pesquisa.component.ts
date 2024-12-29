import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
})
export class PessoasPesquisaComponent {
  pessoas = [
    { nome: 'Fulano', cidade: 'Brasília', estado: 'DF', status: true },
    { nome: 'Ciclano', cidade: 'Rio de Janeiro', estado: 'RJ', status: false },
    { nome: 'Beltrano', cidade: 'São Paulo', estado: 'SP', status: true },
    { nome: 'Zé', cidade: 'Curitiba', estado: 'PR', status: false },
    { nome: 'Maria', cidade: 'Salvador', estado: 'BA', status: true },
    { nome: 'João', cidade: 'Porto Alegre', estado: 'RS', status: false },
    { nome: 'José', cidade: 'Belo Horizonte', estado: 'MG', status: true },
    { nome: 'Ana', cidade: 'Recife', estado: 'PE', status: false },
  ];
}
