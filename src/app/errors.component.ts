import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
   <ul *ngIf="shouldShowErrors()" class="validation-errors">
     <li>{{getError()}}</li>
   </ul>
 `,
})


export class ShowErrorsComponent {
  private static readonly errorMessages = {
    required: (params) => 'This field is required',

    minlength: (params) => 'must be the minimum ' + params.requiredLength + ' Characters',
    maxlength: (params) => 'It shouldnt be bigger than ' + params.requiredLength + ' Characters',
    pattern: (params) => 'deve ser inserido o nome completo: use o nome e o sobrenome.',
    passwordMismatch: (params) => 'Password and password confirmation do not match',
    vaildEmail: (params) => params.message,
    numbersOnly: (params) => params.message,
    validPhone: (params) => params.message,
    onlyAlphabets: (params) => params.message,
    greaterPercentage: (params) => 'The percentage must not exceed 100.',
    dateCheck: (params) => 'Data inválida',
    morethanyear : (params) => 'não deve ser superior a 1 ano',
    notgreaterthan: (params) => 'Final de vigência deve ser maior que Início de vigência',
    expirePolicy:(params) => 'Final de vigência deve ser maior que Fim de vigência da Apólice',
    checks: (params) => 'O limite específico para máquinas e equipamentos não deve ser superior a IS',
    commissionBetween: (params) => 'Comissão não autorizada. Entre em contato com nosso equipe de atendimento'
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;
  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field], this.control));
  }

  getError(): string {
    var errors = Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field], this.control));
    return errors[0];
  }

  private getMessage(type: string, params: any, control: any) {
    var fname = this.getControlName(control);
    fname = fname.replace("_", " ").replace(" id", "").toLowerCase();
    fname = fname.replace(/\b\w/g, l => l.toUpperCase())
    var msg = ShowErrorsComponent.errorMessages[type](params);
    return msg;
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }

}