import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { UsuariosCadastroComponent } from './usuarios-cadastro/usuarios-cadastro.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
  ],
  declarations: [UsuariosCadastroComponent],
})
export class UsuariosModule {}
