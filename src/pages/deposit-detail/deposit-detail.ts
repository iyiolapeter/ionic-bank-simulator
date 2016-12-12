import { Component } from '@angular/core';

import {NavController, Refresher, NavParams, LoadingController, InfiniteScroll} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {Deposit} from "../deposits-page/deposits-page";

@Component({
  selector: 'page-deposit-detail',
  templateUrl: 'deposit-detail.html'
})
export class DepositDetail {

  deposit: Deposit;
  accountHistory: Array<any> = [];
  scrollOffset: number = 0;
  limit: number = 10;
  lastInfiniteScrollRef: InfiniteScroll;

  constructor(public navCtrl: NavController, private navParams: NavParams, public apiService: ApiService, public loadingCtrl: LoadingController) {
    this.deposit = navParams.data.deposit;
  }

  ngOnInit() {
    this.gatherDepositDetails();
  }

  gatherDepositDetails() {
    let loader = this.presentLoading();
    this.scrollOffset = 0;
    if (this.lastInfiniteScrollRef && !this.lastInfiniteScrollRef.enabled) {
      this.lastInfiniteScrollRef.enable(true);
    }

    let depositsPromise = this.apiService.getDeposits().then((deposits: Array<Deposit>) => {
      return this.deposit = deposits.filter((deposit: Deposit) => deposit.uuid === this.deposit.uuid)[0];
    });
    let historyPromise = this.apiService.getAccountHistory({
      accountNumber: this.deposit.Account.number,
      offset: this.scrollOffset,
      limit: this.limit
    }).then((history: Array<any>) => {
      this.accountHistory = history;
      this.scrollOffset += history.length;
      return history;
    });

    return Promise.all([ depositsPromise, historyPromise ]).then(fulfilledResults => {
      loader.dismiss();
      return fulfilledResults;
    });
  }

  refresh(refresher: Refresher) {
    this.gatherDepositDetails().then(() => {
      refresher.complete();
    });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }

  doInfiniteScroll(infiniteScroll: InfiniteScroll) {
    infiniteScroll.enable(false);
    this.lastInfiniteScrollRef = infiniteScroll;

    this.apiService.getAccountHistory({
      accountNumber: this.deposit.Account.number,
      offset: this.scrollOffset,
      limit: this.limit
    }).then((history: Array<any>) => {
      infiniteScroll.complete();
      this.accountHistory.push(...history);
      this.scrollOffset += history.length;
      infiniteScroll.enable(history.length === this.limit);
    });
  }

  doAction(action) {
    console.log(action);
    if (action.toComponent) {
      this.navCtrl.push(action.toComponent, {
        fromAccount: {
          balance: this.deposit.Account.balance,
          number: this.deposit.Account.number,
          currency: this.deposit.Account.Currency
        }
      });
    }
  }
}
