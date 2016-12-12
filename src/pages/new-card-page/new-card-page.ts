import { Component } from '@angular/core';

import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {ApiService, RequestCardParams} from "../../services/api.service";
import deap from 'deap';
import {CardsPage} from "../cards-page/cards-page";

export interface Currency {
  number: number,
  exponent: number,
  code: string,
  symbol: string
}

@Component({
  selector: 'page-new-card',
  templateUrl: 'new-card-page.html'
})
export class NewCardPage {

  form: RequestCardParams = {
    title: 'New Card',
    currencyNumber: 0,
    parentId: null
  };
  currencies: Array<Currency> = [];

  constructor(public navCtrl: NavController,
              public apiService: ApiService,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.gatherCurrencies();
  }

  gatherCurrencies() {
    return this.apiService.getCurrencies().then((currencies: Array<any>) => {
      console.log(currencies);
      this.form.currencyNumber = currencies[2].number;
      this.currencies = currencies;
    }).catch(error => {
      console.error(error);
    });
  }

  create(event) {
    let loader = this.presentLoading();
    this.apiService.createCard(this.form).then(res => {
      setTimeout(() => {
        loader.dismissAll();
        this.presentToast(`Your new card "${this.form.title}" has been created!`, {
          showCloseButton: false
        });
        this.navCtrl.push(CardsPage);
        this.navCtrl.setRoot(CardsPage);
      }, 300)
    }).catch(error => this.handleError(error))
  }

  handleError(error) {
    console.log(error);
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
}
