import {Component, Input, EventEmitter} from '@angular/core';
import {Transfers} from "../../pages/transfers/transfers";
import {Output} from "@angular/core/src/metadata/directives";
import {Deposit} from "../../pages/deposits-page/deposits-page";

@Component({
  selector: 'deposit-detail-info',
  templateUrl: 'deposit-detail-info.html'
})
export class DepositDetailInfo {

  @Input() deposit: Deposit;
  @Output() onAction = new EventEmitter();

  constructor() {
  }

  transferMoney() {
    this.onAction.emit({
      toComponent: Transfers
    });
  }
}