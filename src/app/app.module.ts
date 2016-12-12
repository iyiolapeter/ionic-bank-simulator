import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { CardsPage } from '../pages/cards-page/cards-page';
import {Transfers} from '../pages/transfers/transfers';
import { Welcome } from '../pages/welcome/welcome';
import { SignUp } from '../pages/sign-up/sign-up';
import { SignInForm } from '../components/sign-in-form/sign-in-form';
import { SignUpForm } from '../components/sign-up-form/sign-up-form';
import { UserProfile } from '../components/user-profile/user-profile';
import { HttpModule } from "@angular/http";
import './rxjs-operators';
import {ApiService} from "../services/api.service";
import {ConstantsService} from "../services/constants";
import {UserService} from "../services/user.service";
import {BankCard} from "../components/bank-card/bank-card";
import {NewCardPage} from "../pages/new-card-page/new-card-page";
import {CardDetail} from "../pages/card-detail/card-detail";
import {CardDetailInfo} from "../components/card-detail-info/card-detail-info";
import {AccountHistory} from "../components/account-history/account-history";
import {AccountHistoryItem} from "../components/account-history-item/account-history-item";
import {MoneyPipe} from "../pipes/currency.pipe";
import {DepositsPage} from "../pages/deposits-page/deposits-page";
import {DepositDetail} from "../pages/deposit-detail/deposit-detail";
import {NewDepositPage} from "../pages/new-deposit-page/new-deposit-page";
import {BankDeposit} from "../components/bank-deposit/bank-deposit";
import {DepositDetailInfo} from "../components/deposit-detail-info/deposit-detail-info";

@NgModule({
  declarations: [
    MyApp,
    CardsPage,
    Welcome,
    SignUp,
    NewCardPage,
    CardDetail,
    Transfers,
    DepositsPage,
    DepositDetail,
    NewDepositPage,

    SignInForm,
    SignUpForm,
    UserProfile,
    BankCard,
    CardDetailInfo,
    AccountHistory,
    AccountHistoryItem,
    MoneyPipe,
    BankDeposit,
    DepositDetailInfo
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    CardsPage,
    Welcome,
    SignUp,
    NewCardPage,
    CardDetail,
    Transfers,
    DepositsPage,
    DepositDetail,
    NewDepositPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, ApiService, ConstantsService, UserService]
})
export class AppModule {}
