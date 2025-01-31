import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  permissoesUrl = 'http://localhost:8080/permissoes';
  usuariosUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  async listarPermissoes(): Promise<any> {
    return await this.http
      .get<{ content: any }>(`${this.permissoesUrl}`)
      .toPromise();
  }

  async permissaoPorCodigo(codigo: number): Promise<any> {
    return await this.http
      .get<{ content: any }>(`${this.permissoesUrl}/${codigo}`)
      .toPromise();
  }
}
