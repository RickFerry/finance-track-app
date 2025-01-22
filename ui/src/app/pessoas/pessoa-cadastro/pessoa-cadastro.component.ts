import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model';

import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.scss'],
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private msg: MessageService,
    private error: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  atualizarPessoa() {
    this.pessoaService
      .atualizar(this.pessoa)
      .then((pessoa) => {
        this.pessoa = pessoa;
        this.msg.add({
          severity: 'success',
          summary: 'Pessoa atualizada com sucesso!',
        });
        this.atualizarTituloEdicao();
      })
      .catch((error) => this.error.handler(error));
  }

  adicionarPessoa() {
    this.pessoaService
      .adicionar(this.pessoa)
      .then((pes) => {
        this.msg.add({
          severity: 'success',
          summary: 'Pessoa adicionada com sucesso!',
        });
        this.router.navigate(['/pessoas', pes.codigo]);
      })
      .catch((error) => this.error.handler(error));
  }

  carregarPessoa(codigoPessoa: number) {
    this.pessoaService
      .buscarPorCodigo(codigoPessoa)
      .then((pessoa) => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch((error) => this.error.handler(error));
  }

  novo(form: NgForm) {
    form.reset();
    setTimeout(
      function () {
        this.pessoa = new Pessoa();
      }.bind(this),
      1
    );
    this.title.setTitle('Nova Pessoa');
    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }
}
