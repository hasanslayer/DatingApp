import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authservice.loggedIn()) {
      return true;
    }
    this.alertify.error('You should logged in to access this page');
    this.router.navigate(['/home']);
    return false;
  }
}
