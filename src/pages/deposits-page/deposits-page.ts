import { Component } from '@angular/core';

import {NavController, Refresher, FabContainer} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {DepositDetail} from "../deposit-detail/deposit-detail";
import {NewDepositPage} from "../new-deposit-page/new-deposit-page";
import {Currency} from "../new-card-page/new-card-page";

export interface Deposit {
  uuid: string,
  title: string,
  annualInterest: number,
  lastTimeRewarded: Date,
  timeFrame: string,
  finishDate: Date,
  status: string,
  createdAt: Date,
  updatedAt: Date,
  accountNumber: number,
  Account: {
    number: number,
    title: string,
    balance: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    userUuid: string,
    currencyNumber: number,
    parentId: string,
    Currency: Currency
  }
}

@Component({
  selector: 'page-deposits',
  templateUrl: 'deposits-page.html'
})
export class DepositsPage {

  deposits: Array<Deposit>;

  constructor(public navCtrl: NavController, public apiService: ApiService) {
    
  }

  ngOnInit() {
    this.gatherDeposits();
  }

  gatherDeposits() {
    return this.apiService.getDeposits().then((deposits: Array<Deposit>) => {
      console.log(deposits);
      this.deposits = deposits;
    }).catch(error => {
      console.error(error);
    });
  }

  refresh(refresher: Refresher) {
    this.gatherDeposits().then(() => {
      refresher.complete();
    });
  }

  itemTapped(actionName: string, fab: FabContainer) {
    fab.close();
    let pageType: any;
    switch (actionName) {
      case 'new-deposit':
      default:
        pageType = NewDepositPage;
    }
    this.navCtrl.push(pageType);
  }

  openDeposit(deposit: Deposit) {
    this.navCtrl.push(DepositDetail, {
      deposit
    });
  }
}
