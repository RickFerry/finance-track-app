import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/core/model';

@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './usuarios-cadastro.component.html',
  styleUrls: ['./usuarios-cadastro.component.scss'],
})
export class UsuariosCadastroComponent implements OnInit {
  usuario = new Usuario();

  constructor() {}

  ngOnInit() {}

  novo(_t56: NgForm) {
    throw new Error('Method not implemented.');
  }

  salvar() {
    throw new Error('Method not implemented.');
  }
}
