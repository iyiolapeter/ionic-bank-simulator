import { Component, Output, EventEmitter } from '@angular/core';
import {User} from "./user.interface";
import {ApiService} from "../../services/api.service";
import {Response} from "@angular/http";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html',
  providers: [ ApiService ]
})
export class UserProfile {

  user: User;

  constructor(public userService: UserService) {

  }

  ngOnInit() {
    this.userService.userUpdated.subscribe(user => this.update(user));
    this.userService.gatherUser()
      .then((user: User) => {
        this.user = user;
      })
  }

  update(user) {
    console.log('User updated:', user);
    this.user = user;
  }
}