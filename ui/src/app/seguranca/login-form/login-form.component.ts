import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private service: AuthService,
    private error: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(usuario: string, senha: string) {
    this.service
      .login(usuario, senha)
      .then(() => {
        this.router.navigate(['/lancamentos']);
      })
      .catch((error) => {
        this.error.handler(error);
      });
  }
}
