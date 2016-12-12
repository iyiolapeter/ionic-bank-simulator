import { Component } from '@angular/core';

import {NavController, Refresher, NavParams, LoadingController, InfiniteScroll} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {Card} from "../../components/bank-card/card.interface";

@Component({
  selector: 'page-card-detail',
  templateUrl: 'card-detail.html'
})
export class CardDetail {

  card: Card;
  accountHistory: Array<any> = [];
  scrollOffset: number = 0;
  limit: number = 10;
  lastInfiniteScrollRef: InfiniteScroll;

  constructor(public navCtrl: NavController, private navParams: NavParams, public apiService: ApiService, public loadingCtrl: LoadingController) {
    this.card = navParams.data.card;
  }

  ngOnInit() {
    this.gatherCardDetails();
  }

  gatherCardDetails() {
    let loader = this.presentLoading();
    this.scrollOffset = 0;
    if (this.lastInfiniteScrollRef && !this.lastInfiniteScrollRef.enabled) {
      this.lastInfiniteScrollRef.enable(true);
    }

    let cardPromise = this.apiService.getCards().then((cards: Array<Card>) => {
      return this.card = cards.map(card => {
        card.Cards = card.Cards.map(card => {
          let expirationDate = new Date(card.ccExpiration);
          card.thru = `${expirationDate.getMonth() + 1}/${expirationDate.getFullYear().toString().slice(-2)}`;
          return card;
        });
        return card;
      }).filter((card: Card) => card.number === this.card.number)[0];
    });
    let historyPromise = this.apiService.getAccountHistory({
      accountNumber: this.card.number,
      offset: this.scrollOffset,
      limit: this.limit
    }).then((history: Array<any>) => {
      this.accountHistory = history;
      this.scrollOffset += history.length;
      return history;
    });

    return Promise.all([ cardPromise, historyPromise ]).then(fulfilledResults => {
      loader.dismiss();
    });
  }

  refresh(refresher: Refresher) {
    this.gatherCardDetails().then(() => {
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
      accountNumber: this.card.number,
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
          balance: this.card.balance,
          number: this.card.number,
          currency: this.card.Currency
        }
      });
    }
  }
}
