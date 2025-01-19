import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

import { LancamentoService } from '../Lancamento.service';

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
    private error: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigoLancamento: number) {
    this.lancamentoService
      .buscarPorCodigo(codigoLancamento)
      .then((lancamento) => {
        this.lancamento = lancamento;
      })
      .catch((error) => this.error.handler(error));
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
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }
  atualizarLancamento(form: FormControl) {
    this.lancamentoService
      .atualizar(this.lancamento)
      .then((lancamento) => {
        this.lancamento = lancamento;
        this.msg.add({
          severity: 'success',
          detail: 'Lançamento atualizado com sucesso!',
        });
      })
      .catch((error) => this.error.handler(error));
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService
      .adicionar(this.lancamento)
      .then((lanc) => {
        this.msg.add({
          severity: 'success',
          detail: 'Lançamento adicionado com sucesso!',
        });
        this.router.navigate(['/lancamentos', lanc.codigo]);
      })
      .catch((error) => this.error.handler(error));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(
      function () {
        this.lancamento = new Lancamento();
      }.bind(this),
      1
    );
    this.router.navigate(['/lancamentos/novo']);
  }
}
