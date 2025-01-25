import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  exibindoMenu: boolean = false;
  usuarioLogado: string = '';

  constructor(
    private _auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

  public get auth(): AuthService {
    return this._auth;
  }

  public set auth(value: AuthService) {
    this._auth = value;
  }

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }

  logout() {
    this.auth
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((erro) => this.errorHandler.handler(erro));
  }
}
