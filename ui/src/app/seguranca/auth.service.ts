import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtPayload: any;
  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(private http: HttpClient, private helper: JwtHelperService) {
    this.carregarToken();
  }

  async login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders({
      Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return await this.http
      .post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response) => {
        this.aramazenarToken(response['access_token']);
      })
      .catch((response) => {
        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(response);
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.helper.isTokenExpired(token);
  }

  async obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders({
      Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = 'grant_type=refresh_token';

    try {
      const response = await this.http
        .post(this.oauthTokenUrl, body, { headers, withCredentials: true })
        .toPromise();
      this.aramazenarToken(response['access_token']);
      return await Promise.resolve(null);
    } catch (response_1) {
      return await Promise.resolve(null);
    }
  }

  temQualquerPermissao(roles: string[]): boolean {
    return roles.some((role) => this.temPermissao(role));
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  private aramazenarToken(token: string) {
    this.jwtPayload = this.helper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.aramazenarToken(token);
    }
  }
}
