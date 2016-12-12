import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Card} from "./card.interface";

@Component({
  selector: 'bank-card',
  templateUrl: 'bank-card.html'
})
export class BankCard {

  @Input() card: Card;

  constructor() {

  }

  formatNumber(ccNumber) {
    return ccNumber.split('').map((symbol, index) => {
      if (!(index % 4)) {
        symbol = ' ' + symbol;
      }
      return symbol;
    }).join('');
  }
}