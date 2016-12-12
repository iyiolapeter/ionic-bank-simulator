import {Currency} from "../../pages/new-card-page/new-card-page";

export interface Card {
  Cards: Array<any>,
  Currency: Currency,
  number: number,
  title: string,
  balance: number,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: any,
  userUuid: string,
  currencyNumber: number,
  parentId: any,
  thru?: string;
}