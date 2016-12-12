import { Component } from '@angular/core';

import {NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {Currency} from "../new-card-page/new-card-page";
import {Card} from "../../components/bank-card/card.interface";
import deap from 'deap';
import {Deposit} from "../deposits-page/deposits-page";

export interface TransferAccount {
  number: number,
  title: string,
  balance: number,
  currency: Currency
}

interface TransferForm {
  amount: number,
  to: string,
  fromAccountNumber: number
}

@Component({
  selector: 'page-transfers',
  templateUrl: 'transfers.html'
})
export class Transfers {

  transferType: string;
  myAccounts: Array<TransferAccount>;
  selfTransferForm: TransferForm = {
    amount: 0,
    to: '',
    fromAccountNumber: null
  };
  clientTransferForm: TransferForm = {
    amount: 0,
    to: '',
    fromAccountNumber: null
  };
  transferSent: boolean = false;
  fromAccount: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: ApiService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
    this.fromAccount = navParams.get('fromAccount');
    this.selfTransferForm.fromAccountNumber =  this.fromAccount.number;
    this.clientTransferForm.fromAccountNumber =  this.fromAccount.number;
  }

  ngOnInit() {
    this.transferType = 'self';
    this.getMyAccounts().then((accounts: Array<TransferAccount>) => {
      this.myAccounts = accounts;
      if (accounts.length) {
        this.selfTransferForm.to = accounts[0].number.toString();
      }
    });
  }

  getMyAccounts(): Promise<Array<any>> {
    let myCards = this.apiService.getCards().then((cards: Array<Card>) => {
      return cards.map(cardAccount => {
        let account: TransferAccount = {
          balance: cardAccount.balance,
          currency: cardAccount.Currency,
          number: cardAccount.number,
          title: cardAccount.title
        };
        return account;
      }).filter((account: TransferAccount) => account.number !== this.fromAccount.number);
    });
    let myDeposits = this.apiService.getDeposits().then(deposits => {
      return deposits.map((deposit: Deposit) => {
        let account: TransferAccount = {
          balance: deposit.Account.balance,
          currency: deposit.Account.Currency,
          number: deposit.accountNumber,
          title: deposit.title
        };
        return account;
      }).filter((account: TransferAccount) => account.number !== this.fromAccount.number);
    });
    return Promise.all([ myCards, myDeposits ]).then(fulfilledResults => {
      return fulfilledResults[0].concat(fulfilledResults[1]);
    });
  }

  transfer(): Promise<any> {
    this.transferSent = true;
    let form: TransferForm;
    switch (this.transferType) {
      case 'self':
        form = this.selfTransferForm;
        break;
      case 'client':
        form = this.clientTransferForm;
        break;
      default:
        return Promise.reject('No method');
    }
    let loader = this.presentLoading();
    return this.apiService.transfer(form).then(() => {
      loader.dismissAll();
      this.presentToast(`You successfully transferred ${Math.max(0, Number(form.amount)).toFixed(2)} to another account!`);
      if (this.navCtrl.canGoBack()) {
        this.navCtrl.pop();
      }
    }).catch(errorObject => {
      loader.dismissAll();
      this.transferSent = false;
      this.handleError(errorObject.json().error)
    });
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
      content: "Transferring..."
    });
    loader.present();
    return loader;
  }

  handleError(error) {
    this.presentToast(error.message || error.description);
  }
}
