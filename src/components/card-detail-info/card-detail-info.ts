import {Component, Input, EventEmitter} from '@angular/core';
import {Card} from "../bank-card/card.interface";
import {NavController} from "ionic-angular";
import {Transfers} from "../../pages/transfers/transfers";
import {Output} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'card-detail-info',
  templateUrl: 'card-detail-info.html'
})
export class CardDetailInfo {

  @Input() card: Card;
  @Output() onAction = new EventEmitter();

  constructor() {
  }

  transferMoney() {
    this.onAction.emit({
      toComponent: Transfers
    });
  }
}