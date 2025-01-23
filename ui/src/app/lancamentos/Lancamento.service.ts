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
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzc3NTcwNjEsInVzZXJfbmFtZSI6ImFkbWluQGVtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIiwiUk9MRV9SRU1PVkVSX0NBVEVHT1JJQSJdLCJqdGkiOiJhZjFiMjc5OC05ZDgzLTRiOGEtOTM3NS1lNWFiMDM4ZjZjOTUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gM4-0Csdui3m7Lc7o62PcGO_S3TX2jkeflabswuRGWk',
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
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzc3NTcwNjEsInVzZXJfbmFtZSI6ImFkbWluQGVtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIiwiUk9MRV9SRU1PVkVSX0NBVEVHT1JJQSJdLCJqdGkiOiJhZjFiMjc5OC05ZDgzLTRiOGEtOTM3NS1lNWFiMDM4ZjZjOTUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gM4-0Csdui3m7Lc7o62PcGO_S3TX2jkeflabswuRGWk',
    });

    await this.http
      .delete(`${this.lancamentoUrl}/${codigo}`, { headers })
      .toPromise();
  }

  async adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzc3NTcwNjEsInVzZXJfbmFtZSI6ImFkbWluQGVtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIiwiUk9MRV9SRU1PVkVSX0NBVEVHT1JJQSJdLCJqdGkiOiJhZjFiMjc5OC05ZDgzLTRiOGEtOTM3NS1lNWFiMDM4ZjZjOTUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gM4-0Csdui3m7Lc7o62PcGO_S3TX2jkeflabswuRGWk',
      'Content-Type': 'application/json',
    });

    const response = await this.http
      .post<Lancamento>(this.lancamentoUrl, JSON.stringify(lancamento), {
        headers,
      })
      .toPromise();

    return response;
  }

  async atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzc3NTcwNjEsInVzZXJfbmFtZSI6ImFkbWluQGVtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIiwiUk9MRV9SRU1PVkVSX0NBVEVHT1JJQSJdLCJqdGkiOiJhZjFiMjc5OC05ZDgzLTRiOGEtOTM3NS1lNWFiMDM4ZjZjOTUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gM4-0Csdui3m7Lc7o62PcGO_S3TX2jkeflabswuRGWk',
      'Content-Type': 'application/json',
    });

    const response = await this.http
      .put<Lancamento>(
        `${this.lancamentoUrl}/${lancamento.codigo}`,
        JSON.stringify(lancamento),
        { headers }
      )
      .toPromise()
      .then((lancamento) => {
        this.converterStringsParaDatas([lancamento]);
        return lancamento;
      });

    return response;
  }

  async buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzc3NTcwNjEsInVzZXJfbmFtZSI6ImFkbWluQGVtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIiwiUk9MRV9SRU1PVkVSX0NBVEVHT1JJQSJdLCJqdGkiOiJhZjFiMjc5OC05ZDgzLTRiOGEtOTM3NS1lNWFiMDM4ZjZjOTUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gM4-0Csdui3m7Lc7o62PcGO_S3TX2jkeflabswuRGWk',
    });

    const response = await this.http
      .get<Lancamento>(`${this.lancamentoUrl}/${codigo}`, { headers })
      .toPromise()
      .then((lancamento) => {
        this.converterStringsParaDatas([lancamento]);
        return lancamento;
      });

    return response;
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
