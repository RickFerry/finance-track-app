import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzczMzk3NjIsInVzZXJfbmFtZSI6ImFkbWluQGVtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIiwiUk9MRV9SRU1PVkVSX0NBVEVHT1JJQSJdLCJqdGkiOiI1MGJkMjUxNy03ZGRjLTRlMjQtYTUyZS02MmM3NDUxYzkwZDIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.nFQ1SZfIfASikKddCCzo9hvRkmv6u3kZ-E6EtQs54qk',
    });

    configureRequestParams();

    const response = await this.http
      .get<{ content: any }>(`${this.lancamentoUrl}?resumo`, {
        headers,
        params,
      })
      .toPromise();

    return response;

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
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzczMzk3NjIsInVzZXJfbmFtZSI6ImFkbWluQGVtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIiwiUk9MRV9SRU1PVkVSX0NBVEVHT1JJQSJdLCJqdGkiOiI1MGJkMjUxNy03ZGRjLTRlMjQtYTUyZS02MmM3NDUxYzkwZDIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.nFQ1SZfIfASikKddCCzo9hvRkmv6u3kZ-E6EtQs54qk',
    });

    await this.http
      .delete(`${this.lancamentoUrl}/${codigo}`, { headers })
      .toPromise();
  }

  async adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzczMzk3NjIsInVzZXJfbmFtZSI6ImFkbWluQGVtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIiwiUk9MRV9SRU1PVkVSX0NBVEVHT1JJQSJdLCJqdGkiOiI1MGJkMjUxNy03ZGRjLTRlMjQtYTUyZS02MmM3NDUxYzkwZDIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.nFQ1SZfIfASikKddCCzo9hvRkmv6u3kZ-E6EtQs54qk',
      'Content-Type': 'application/json',
    });

    const response = await this.http
      .post<Lancamento>(this.lancamentoUrl, JSON.stringify(lancamento), { headers })
      .toPromise();

    return response;
  }
}
