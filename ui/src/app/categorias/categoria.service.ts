import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  categoriaUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) {}

  async listarTodas(): Promise<any> {
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzc3NTcwNjEsInVzZXJfbmFtZSI6ImFkbWluQGVtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIiwiUk9MRV9SRU1PVkVSX0NBVEVHT1JJQSJdLCJqdGkiOiJhZjFiMjc5OC05ZDgzLTRiOGEtOTM3NS1lNWFiMDM4ZjZjOTUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gM4-0Csdui3m7Lc7o62PcGO_S3TX2jkeflabswuRGWk',
    });

    return this.http
      .get<{ content: any }>(`${this.categoriaUrl}`, { headers })
      .toPromise();
  }
}
