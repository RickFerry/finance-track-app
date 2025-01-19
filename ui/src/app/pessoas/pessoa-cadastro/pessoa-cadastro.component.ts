import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
    private error: ErrorHandlerService
  ) {}

  ngOnInit() {}

  salvar(form: FormControl) {
    this.pessoaService
      .adicionar(this.pessoa)
      .then(() => {
        this.msg.add({
          severity: 'success',
          summary: 'Pessoa adicionada com sucesso!',
        });
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch((error) => this.error.handler(error));
  }
}
