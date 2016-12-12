import { Injectable } from "@angular/core";

@Injectable()
export class ConstantsService {

  public serverUri: string = 'http://bks.alexbelov.xyz';
  public apiPath: string = '/api';

  constructor () {}
}