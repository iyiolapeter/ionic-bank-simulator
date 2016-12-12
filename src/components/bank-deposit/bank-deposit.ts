import {Component, Input} from '@angular/core';
import {Deposit} from "../../pages/deposits-page/deposits-page";

@Component({
  selector: 'bank-deposit',
  templateUrl: 'bank-deposit.html'
})
export class BankDeposit {

  @Input() deposit: Deposit;

  constructor() {
  }
}