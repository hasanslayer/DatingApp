import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth';
  userToken: any;

  constructor(private http: Http) {}

  login(model: any) {
    const headers = new Headers({ 'Content-type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.baseUrl + 'login', model, options)
      .map((res: Response) => {
        const user = res.json();
        if (user) {
          localStorage.setItem('token', user.tokenString);
          this.userToken = user.tokenString;
        }
      });
  }
}
