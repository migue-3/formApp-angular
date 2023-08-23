import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
// import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern ) ]],
    email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidatorService() ]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    password2: ['', [Validators.required ]]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2') //de esta forma tenemos acceso a todo el form y sus campos. Lo hacemos de esta forma fuera de los {} por que ocupamos dos campos password y password2
    ]   
  });

  constructor( private fb: FormBuilder,
               private validatorsService: ValidatorsService
             ) {}

  isValidField( field: string) {
    //TODO: obtener validacion desde un servicio
    return this.validatorsService.isValidField( this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
