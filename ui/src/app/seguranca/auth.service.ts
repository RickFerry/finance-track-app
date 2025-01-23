import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(private http: HttpClient) {}

  async login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return await this.http
      .post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  }
}
