import {Component, Input} from '@angular/core';
import {Card} from "../bank-card/card.interface";

@Component({
  selector: 'account-history-item',
  templateUrl: 'account-history-item.html'
})
export class AccountHistoryItem {

  @Input() item: any;

  constructor() {
  }
}