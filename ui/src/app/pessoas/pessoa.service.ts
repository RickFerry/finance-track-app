import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa } from '../core/model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) {}

  async pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();

    configureRequestParams();

    const response = await this.http
      .get<{ content: any }>(`${this.pessoaUrl}`)
      .toPromise();

    return response;

    function configureRequestParams() {
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());

      if (filtro.nome) {
        params = params.set('nome', filtro.nome);
      }
    }
  }

  async listarTodas(): Promise<any> {
    return this.http.get<{ content: any }>(`${this.pessoaUrl}`).toPromise();
  }

  async excluir(codigo: any): Promise<void> {
    await this.http.delete(`${this.pessoaUrl}/${codigo}`).toPromise();
  }

  async mudarStatus(codigo: any, ativo: boolean): Promise<void> {
    await this.http
      .patch(`${this.pessoaUrl}/${codigo}/ativo`, ativo)
      .toPromise();
  }

  async adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const response = await this.http
      .post<Pessoa>(`${this.pessoaUrl}`, JSON.stringify(pessoa))
      .toPromise();

    return response;
  }

  async buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return await this.http
      .get<Pessoa>(`${this.pessoaUrl}/${codigo}`)
      .toPromise();
  }

  async atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return await this.http
      .put<Pessoa>(`${this.pessoaUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
      .toPromise();
  }
}
