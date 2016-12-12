import { Component, ViewChild } from '@angular/core';

import { Storage } from '@ionic/storage';
import { NavController, ToastController } from 'ionic-angular';
import { SignUpForm } from "../../components/sign-up-form/sign-up-form";
import { Response } from "@angular/http";
import {Welcome} from "../welcome/welcome";
import {CardsPage} from "../cards-page/cards-page";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUp {

  @ViewChild(SignUpForm) signUpForm: SignUpForm;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public storage: Storage, public userService: UserService) {
  }

  back(event) {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.push(Welcome);
    }
  }

  formSubmitted(form) {
    console.log('Handled output:', form);
    this.signUpForm.submitData(form).subscribe((res: Response) => {
      let body = res.json();
      let token = body.token || { };
      this.storage.set('token', token).then(() => {
        this.userService.gatherUser();
      });
      this.navCtrl.push(CardsPage);
      this.navCtrl.setRoot(CardsPage);

      setTimeout(() => {
        this.presentToast('Your account was successfully created!');
      }, 200);
    }, (error: Response | any) => {
      let body = error.json() || {};
      this.presentToast(body.error.description || body.error.message);
    });
  }

  presentToast(customMessage) {
    let toast = this.toastCtrl.create({
      message: customMessage,
      showCloseButton: true,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
