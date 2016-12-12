import {Component, Input} from '@angular/core';
import {Card} from "../bank-card/card.interface";
import {Deposit} from "../../pages/deposits-page/deposits-page";

@Component({
  selector: 'account-history',
  templateUrl: 'account-history.html'
})
export class AccountHistory {

  @Input() history: Array<any>;

  constructor() {
  }
}