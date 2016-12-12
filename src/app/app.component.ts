import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { CardsPage } from '../pages/cards-page/cards-page';
import { Welcome } from '../pages/welcome/welcome';
import {Storage} from "@ionic/storage";
import deap from 'deap';
import {UserProfile} from "../components/user-profile/user-profile";
import {DepositsPage} from "../pages/deposits-page/deposits-page";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(UserProfile) userProfile: UserProfile;

  rootPage: any = Welcome;
  rootResolved: boolean = false;

  pages: Array<{title: string, component: any, isHandler?: boolean, icon: string }>;

  constructor(public platform: Platform,
              public alertCtrl: AlertController,
              public storage: Storage,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Cards', component: CardsPage, icon: 'card' },
      { title: 'Deposits', component: DepositsPage, icon: 'cash' },
      { title: 'Log Out', component: this.logOut.bind(this), isHandler: true, icon: 'exit'}
    ];
  }

  initializeApp() {
    let loader = this.presentLoading();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.storage.get('token').then(token => {
        if (token) {
          console.log('Logged in with:', token);
          this.rootPage = CardsPage;
          this.nav.setRoot(CardsPage);
          setTimeout(() => {
            this.presentToast('Welcome back!');
          }, 1000);
        }
        setTimeout(() => {
          this.rootResolved = true;
          loader.dismiss();
        }, 50);
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.isHandler) {
      page.component();
    } else {
      this.nav.setRoot(page.component);
    }
  }

  presentToast(customMessage, params: any = {}) {
    let defaultParams = {
      message: customMessage,
      showCloseButton: true,
      position: 'bottom',
      duration: 3000
    };
    //noinspection TypeScriptUnresolvedFunction
    deap.merge(params, defaultParams);
    let toast = this.toastCtrl.create(params);
    toast.present();
    return toast;
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    return loader;
  }

  logOut() {
    this.presentToast('Logging out...', {
      duration: 1000
    });
    this.storage.clear().then(() => {
      this.nav.push(Welcome);
      this.nav.setRoot(Welcome);
      this.presentToast('You logged out successfully!', {
        duration: 2000
      });
      this.userProfile.user = null;
    });
  }
}
