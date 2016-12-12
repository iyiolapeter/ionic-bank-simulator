import { Component } from '@angular/core';

import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {ApiService, RequestCardParams} from "../../services/api.service";
import deap from 'deap';
import {CardsPage} from "../cards-page/cards-page";
import {Currency} from "../new-card-page/new-card-page";
import {DepositsPage} from "../deposits-page/deposits-page";

@Component({
  selector: 'page-new-deposit',
  templateUrl: 'new-deposit-page.html'
})
export class NewDepositPage {

  form: any = {
    title: 'New Deposit',
    currencyNumber: 0,
    timeFrame: null
  };
  currencies: Array<Currency> = [];
  timeFrames: Array<any> = [{
    title: '6 months',
    value: 'half_year'
  }, {
    title: '1 year',
    value: 'year'
  }, {
    title: '2 years',
    value: 'two_years'
  }];

  constructor(public navCtrl: NavController,
              public apiService: ApiService,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
    this.form.timeFrame = this.timeFrames[0].value;
  }

  ngOnInit() {
    this.gatherCurrencies();
  }

  gatherCurrencies() {
    return this.apiService.getCurrencies().then((currencies: Array<any>) => {
      this.form.currencyNumber = currencies[1].number;
      this.currencies = currencies;
    }).catch(error => {
      console.error(error);
    });
  }

  create(event) {
    let loader = this.presentLoading();
    this.apiService.createDeposit(this.form).then(res => {
      setTimeout(() => {
        loader.dismissAll();
        this.presentToast(`Your new deposit "${this.form.title}" has been created!`, {
          showCloseButton: false
        });
        this.navCtrl.push(DepositsPage);
        this.navCtrl.setRoot(DepositsPage);
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
