import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  pageSize = 5; // this is for testing purposes
  pageNumber = 1;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService
      .getUsers(this.pageNumber, this.pageSize)
      .catch(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return Observable.of(null);
      }); // there is no need to use subscibe because root resolver automatically use it
  }
}
