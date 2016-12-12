import { Component, ViewChild } from '@angular/core';

import { Storage } from '@ionic/storage';
import {NavController, ToastController} from 'ionic-angular';
import { SignUp } from "../sign-up/sign-up";
import {Response} from "@angular/http";
import {SignInForm} from "../../components/sign-in-form/sign-in-form";
import {UserService} from "../../services/user.service";
import {CardsPage} from "../cards-page/cards-page";

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class Welcome {

  @ViewChild(SignInForm) signInForm: SignInForm;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public userService: UserService) {
  }

  goToSignUp($event) {
    this.navCtrl.push(SignUp);
  }

  formSubmitted(form) {
    console.log('Handled output:', form);
    this.signInForm.submitData(form).subscribe((res: Response) => {
      let body = res.json();
      let token = body.token || { };
      this.storage.set('token', token).then(() => {
        this.userService.gatherUser();
      });
      this.navCtrl.push(CardsPage);
      this.navCtrl.setRoot(CardsPage);

      setTimeout(() => {
        this.presentToast('You successfully logged in!');
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
