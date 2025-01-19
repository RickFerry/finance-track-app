import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../Lancamento.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.scss'],
})
export class LancamentoCadastroComponent implements OnInit {
  categorias: any = [];
  pessoas: any = [];
  lancamento = new Lancamento();
  tipos: any = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private msg: MessageService,
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

  salvar(form: FormControl) {
    this.lancamentoService
      .adicionar(this.lancamento)
      .then(() => {
        this.msg.add({
          severity: 'success',
          detail: 'Lançamento adicionado com sucesso!',
        });
        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch((error) => this.error.handler(error));
  }
}
