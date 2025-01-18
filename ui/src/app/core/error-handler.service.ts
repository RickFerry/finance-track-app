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
    } else if (
      errorResponse instanceof Response ||
      (errorResponse.status >= 400 && errorResponse.status <= 499)
    ) {
      let errors: { mensagemUsuario: string; }[];
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        errors = errorResponse.error;
        msg = errors[0].mensagemUsuario;
      } catch (e) {
        console.error('Ocorreu um erro', errorResponse);
      }
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
