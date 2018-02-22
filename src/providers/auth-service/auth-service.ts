import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpServiceProvider } from '../http-service/http-service';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;

  constructor(private httpServiceProvider:HttpServiceProvider){}

  // 로그인
  public login(credentials) {

    if (credentials.email === null || credentials.password === null) {

      return Observable.throw("Please insert credentials");
    } else {

      return Observable.create(observer => {
        // DB에서 account를 가져와 로그인 체크
        this.httpServiceProvider.getAccount().subscribe(
          data => {
            for (let key in data) {
              let access = (credentials.password === data[key].password && credentials.email === data[key].email);

              if (access) {
                this.currentUser = new User(data[key].name, data[key].email);
                observer.next(access);
                observer.complete();
              } else {
                observer.next(false);
                observer.complete();
              }
            }
          }
        )
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // DB에 값을 추가
      this.httpServiceProvider.insertAccount(credentials).subscribe(
        data => console.log(data)
      )

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
