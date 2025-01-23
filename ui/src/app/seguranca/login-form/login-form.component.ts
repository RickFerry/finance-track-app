import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(private service: AuthService) {}

  ngOnInit() {}

  login(usuario: string, senha: string) {
    this.service.login(usuario, senha);
  }
}
