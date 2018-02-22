import { Injectable } from '@angular/core';
import { Http, Response, Headers  } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class HttpServiceProvider {
  constructor(private http:Http) { }

  // 로그인시에 사용자 확인
  getAccount() {
    return this.http.get('https://currency-9d47a.firebaseio.com/account.json')
    .map((response:Response) => response.json());
  }

  insertAccount(credentials:any) {
    const body = JSON.stringify(credentials);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://currency-9d47a.firebaseio.com/account.json', body, {headers:headers}).map((data:Response) => data.json());
  }
}
