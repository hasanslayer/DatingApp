import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs/Observable';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageSize = 5; // this is for testing purposes
  pageNumber = 1;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pageNumber,
        this.pageSize,
        this.messageContainer
      )
      .catch(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return Observable.of(null);
      }); // there is no need to use subscibe because root resolver automatically use it
  }
}
