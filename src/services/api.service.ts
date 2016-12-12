import { Injectable } from "@angular/core";
import {ConstantsService} from "./constants";
import {Http, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs";
import {User} from "../components/user-profile/user.interface";
import {Card} from "../components/bank-card/card.interface";

export interface RequestCardParams {
  title: string,
  currencyNumber: number,
  parentId: string | any
}

export interface RequestDepositParams {
  title: string,
  timeFrame: string
  currencyNumber: number,
}

@Injectable()
export class ApiService {

  constructor (private http: Http, private constants: ConstantsService, private storage: Storage) {
  }

  getMe(): Promise<User | any> {
    return this.request('/user/me', 'get');
  }

  getCards(): Promise<Card | any> {
    return this.request('/bank/account/cards', 'get');
  }

  createCard(data: RequestCardParams) {
    return this.request('/bank/account/cards', 'post', data);
  }

  getDeposits(): Promise<any> {
    return this.request('/bank/deposit/deposits', 'get');
  }

  createDeposit(data: RequestDepositParams) {
    return this.request('/bank/deposit/deposits', 'post', data);
  }

  transfer(data: any) {
    return this.request('/bank/transfer/client', 'post', data);
  }

  getCurrencies(): Promise<any> {
    return this.request('/bank/transfer/getCurrencies', 'get');
  }

  getAccountHistory(params): Promise<any> {
    return this.request('/bank/transfer/history', 'get', params);
  }

  private getApiEndpoint(pathTo) {
    return `${this.constants.serverUri}${this.constants.apiPath}${pathTo}`;
  }

  private request(pathTo, method, params = {}): Promise<Observable<any>> {
    return this.storage.get('token').then(token => {
      if (!token) {
        throw new Error('User has no auth token');
      }
      let endpoint = this.getApiEndpoint(pathTo);
      let headers = new Headers({
        'Content-Type': 'application/json',
        'X-Token': token
      });
      let options = new RequestOptions({ headers: headers });

      switch (method) {
        case 'post':
        default:
          return this.http.post(endpoint, params, options);
        case 'get':
          let queryParams: URLSearchParams = new URLSearchParams();
          for (let param in params) {
            queryParams.set(param, params[ param ]);
          }
          options.search = queryParams;
          return this.http.get(endpoint, options);
        case 'delete':
          options.body = params;
          return this.http.delete(endpoint, options);
      }
    }).then(observable => {
      return observable.map(res => res.json())
        .toPromise()
    });
  }
}