import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.scss'],
})
export class LancamentoCadastroComponent implements OnInit {
  tipos: any = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias: any = [];

  pessoas: any = [];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private error: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    this.categoriaService
      .listarTodas()
      .then((categorias) => {
        this.categorias = categorias.content.map(
          (c: { nome: any; codigo: any }) => ({
            label: c.nome,
            value: c.codigo,
          })
        );
      })
      .catch((error) => this.error.handler(error));
  }

  carregarPessoas() {
    this.pessoaService
      .listarTodas()
      .then((pessoas) => {
        this.pessoas = pessoas.content.map((p: { nome: any; codigo: any }) => ({
          label: p.nome,
          value: p.codigo,
        }));
      })
      .catch((error) => this.error.handler(error));
  }
}
