import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private toast: MessageService) {}

  handler(errorResponse: any): void {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }
    this.toast.add({
      severity: 'error',
      summary: 'Erro!',
      detail: msg,
    });
  }
}
