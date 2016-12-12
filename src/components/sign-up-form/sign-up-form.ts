import { Component, Output, EventEmitter } from '@angular/core';
import { SignUpFormFields } from "./sign-up-form-fields.interface";
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantsService } from "../../services/constants";

@Component({
  selector: 'sign-up-form',
  templateUrl: 'sign-up-form.html',
  providers: [ ConstantsService ]
})
export class SignUpForm {

  @Output() formSubmitted = new EventEmitter();

  form: SignUpFormFields = new SignUpFormFields();
  stepNumber: number = 1;

  constructor(private http: Http, public constants: ConstantsService) {

  }

  signUp() {
    console.log('Sign up form:', this.form);
    this.formSubmitted.emit(this.form);
  }

  nextStep() {
    this.stepNumber++;
  }

  submitData(form: SignUpFormFields): Observable<any> {
    let endpoint = `${this.constants.serverUri}${this.constants.apiPath}/user/authenticate/sign-up`;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(endpoint, form, options);
  }
}