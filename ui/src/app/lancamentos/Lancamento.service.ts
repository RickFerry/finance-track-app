import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {}

  pesquisar(): Promise<any> {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http
      .get(`${this.lancamentoUrl}?resumo`, { headers })
      .toPromise()
      .then((response) => {
        console.log(JSON.stringify(response));
      });
  }
}
