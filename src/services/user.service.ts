import {Injectable, Output, EventEmitter} from "@angular/core";
import {User} from "../components/user-profile/user.interface";
import {ApiService} from "./api.service";
import {Response} from "@angular/http";

@Injectable()
export class UserService {

  user: User;
  @Output() userUpdated = new EventEmitter();

  constructor (private apiService: ApiService) {
  }

  gatherUser() {
    return this.apiService.getMe()
      .then(user => {
        this.user = user;
        this.userUpdated.emit(user);
        return user;
      })
      .catch(this.handleError);
  }

  handleError(error: Response | any) {
    console.log('Log', error);
  }
}