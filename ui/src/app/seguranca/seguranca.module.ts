import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  declarations: [LoginFormComponent],
})
export class SegurancaModule {}
