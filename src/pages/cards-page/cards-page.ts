import { Component } from '@angular/core';

import {NavController, Refresher, FabContainer} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {Card} from "../../components/bank-card/card.interface";
import {NewCardPage} from "../new-card-page/new-card-page";
import {CardDetail} from "../card-detail/card-detail";

@Component({
  selector: 'page-cards',
  templateUrl: 'cards-page.html'
})
export class CardsPage {

  cards: Array<Card>;

  constructor(public navCtrl: NavController, public apiService: ApiService) {
    
  }

  ngOnInit() {
    this.gatherCards();
  }

  gatherCards() {
    return this.apiService.getCards().then((cards: Array<Card>) => {
        console.log(cards);
        this.cards = cards.map(card => {
          card.Cards = card.Cards.map(card => {
            let expirationDate = new Date(card.ccExpiration);
            card.thru = `${expirationDate.getMonth() + 1}/${expirationDate.getFullYear().toString().slice(-2)}`;
            return card;
          });
          return card;
        });
      }).catch(error => {
        console.error(error);
      });
  }

  refresh(refresher: Refresher) {
    this.gatherCards().then(() => {
      refresher.complete();
    });
  }

  itemTapped(actionName: string, fab: FabContainer) {
    fab.close();
    let pageType: any;
    switch (actionName) {
      case 'new-card':
      default:
        pageType = NewCardPage;
    }
    this.navCtrl.push(pageType);
  }

  openCard(card: Card) {
    this.navCtrl.push(CardDetail, {
      card
    });
  }
}
