import {Component, Output, EventEmitter} from '@angular/core';
import { SignInFormFields } from "./sign-in-form-fields.interface";
import {Observable} from "rxjs/Observable";
import {ConstantsService} from "../../services/constants";
import {Headers, RequestOptions, Http} from "@angular/http";

@Component({
  selector: 'sign-in-form',
  templateUrl: 'sign-in-form.html',
  providers: [ ConstantsService ]
})
export class SignInForm {

  @Output() formSubmitted = new EventEmitter();
  form: SignInFormFields = new SignInFormFields();

  constructor(public http: Http, private constants: ConstantsService) {

  }

  signIn() {
    console.log('Sign in form:', this.form);
    this.formSubmitted.emit(this.form);
  }

  submitData(form: SignInFormFields): Observable<any> {
    console.log(form);
    let endpoint = `${this.constants.serverUri}${this.constants.apiPath}/user/authenticate/sign-in`;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(endpoint, form, options);
  }
}