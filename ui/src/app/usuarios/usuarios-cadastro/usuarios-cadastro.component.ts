import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Permissao, Usuario } from 'src/app/core/model';

import { UsuariosService } from '../usuarios.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './usuarios-cadastro.component.html',
  styleUrls: ['./usuarios-cadastro.component.scss'],
})
export class UsuariosCadastroComponent implements OnInit {
  usuario = new Usuario();

  permissoes: Permissao[];

  constructor(
    private usuarioService: UsuariosService,
    private msg: MessageService,
    private error: ErrorHandlerService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.carregarPermissoes();
  }

  carregarPermissoes() {
    this.usuarioService
      .listarPermissoes()
      .then((data) => {
        this.permissoes = data.content.map((p: Permissao) => ({
          name: p.descricao,
          descricao: p.descricao,
          codigo: p.codigo,
        }));
      })
      .catch((error) => this.error.handler(error));
  }

  salvar() {
    this.usuarioService
      .cadastrar(this.usuario)
      .then(() => {
        this.msg.add({
          severity: 'success',
          summary: 'Usuário cadastrado com sucesso!',
        });
        this.usuario = new Usuario();
      })
      .catch((error) => this.error.handler(error));
  }

  novo(form: NgForm) {
    form.reset();
    setTimeout(
      function () {
        this.usuario = new Usuario();
      }.bind(this),
      1
    );
    this.router.navigate(['/lancamentos']);
  }
}
