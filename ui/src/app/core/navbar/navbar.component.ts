import { Component } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  exibindoMenu = false;

  constructor(private _authService: AuthService) {}

  public get authService(): AuthService {
    return this._authService;
  }

  public set authService(value: AuthService) {
    this._authService = value;
  }
}
