import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class CurrencyServiceProvider {
  constructor(private http:Http) { }

  // 빗썸 코인 시세 가져옴
  getTicker() {
    return this.http.get('https://api.bithumb.com/public/ticker/all')
    .map((response:Response) => response.json());
  }
}
