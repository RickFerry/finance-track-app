import { Component, OnInit } from '@angular/core';
import { permissao, Usuario } from 'src/app/core/model';

import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './usuarios-cadastro.component.html',
  styleUrls: ['./usuarios-cadastro.component.scss'],
})
export class UsuariosCadastroComponent implements OnInit {
  usuario = new Usuario();

  permissoes: permissao[] = [];

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit() {
    this.carregarPermissoes();
  }

  carregarPermissoes() {
    this.usuarioService.listarPermissoes().then((data) => {
      this.permissoes = data.content.map((p: any) => ({
        name: p.descricao,
        code: p.codigo,
      }));
    });
  }

  salvar() {
    console.log(this.usuario);
  }
}
