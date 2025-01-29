import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {}

  async pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();

    configureRequestParams();

    return await this.http
      .get<{ content: any }>(`${this.lancamentoUrl}?resumo`, {
        params,
      })
      .toPromise();

    function configureRequestParams() {
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());

      if (filtro.descricao) {
        params = params.set('descricao', filtro.descricao);
      }

      if (filtro.dataVencimentoInicio) {
        const dataVencimentoInicio = filtro.dataVencimentoInicio
          .toISOString()
          .split('T')[0];
        params = params.set('dataVencimentoDe', dataVencimentoInicio);
      }

      if (filtro.dataVencimentoFim) {
        const dataVencimentoFim = filtro.dataVencimentoFim
          .toISOString()
          .split('T')[0];
        params = params.set('dataVencimentoAte', dataVencimentoFim);
      }
    }
  }

  async excluir(codigo: number): Promise<void> {
    await this.http.delete(`${this.lancamentoUrl}/${codigo}`).toPromise();
  }

  async adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return await this.http
      .post<Lancamento>(`${this.lancamentoUrl}`, lancamento)
      .toPromise();
  }

  async atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return await this.http
      .put<Lancamento>(`${this.lancamentoUrl}/${lancamento.codigo}`, lancamento)
      .toPromise()
      .then((lancamento) => {
        this.converterStringsParaDatas([lancamento]);
        return lancamento;
      });
  }

  async buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return await this.http
      .get<Lancamento>(`${this.lancamentoUrl}/${codigo}`)
      .toPromise()
      .then((lancamento) => {
        this.converterStringsParaDatas([lancamento]);
        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      if (typeof lancamento.dataVencimento === 'string') {
        lancamento.dataVencimento = this.stringParaData(
          lancamento.dataVencimento
        );
      }

      if (
        lancamento.dataPagamento &&
        typeof lancamento.dataPagamento === 'string'
      ) {
        lancamento.dataPagamento = this.stringParaData(
          lancamento.dataPagamento
        );
      }
    }
  }

  private stringParaData(dataString: string): Date {
    const [year, month, day] = dataString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}
