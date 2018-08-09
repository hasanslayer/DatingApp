import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']).catch(error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/members']);
      return Observable.of(null);
    }); // there is no need to use subscibe because root resolver automatically use it
  }
}
