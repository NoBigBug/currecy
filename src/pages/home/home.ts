import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CurrencyServiceProvider } from '../../providers/currency-service/currency-service';
import { Ticker } from '../../interfaces/ticker';
import { Kakao } from 'http://developers.kakao.com/sdk/js/kakao.min.js';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  tickerList: Ticker[];
  key: string = '';
  reverse: string = '';

  constructor(private nav: NavController, private auth: AuthServiceProvider, private currency: CurrencyServiceProvider) {
    this.getTicker();
    // 1초에 한번씩 다시 갱신한다.
    setInterval(() => this.getTicker(), 1000);
  }

  public getTicker() {
    this.currency.getTicker().subscribe(ticker => {
      const myArray = [];
      const tickers = ticker.data;
      for (let key in tickers) {
        if (key != 'date') {
          let day_before_price = Math.ceil(tickers[key].closing_price) - Math.ceil(tickers[key].opening_price);
          let volume_price = Math.ceil(tickers[key].closing_price * tickers[key].volume_1day);
          tickers[key].currency = key;
          tickers[key].closing_price = Math.ceil(tickers[key].closing_price);
          tickers[key].day_before_price = day_before_price;
          tickers[key].day_before_percent = ((day_before_price / Math.ceil(tickers[key].opening_price)) * 100).toFixed(2);
          tickers[key].volume_1day = Math.ceil(tickers[key].volume_1day);
          tickers[key].volume_price = volume_price;

          tickers[key].closing_price_toString = tickers[key].closing_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          tickers[key].day_before_price_toString = tickers[key].day_before_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          tickers[key].volume_1day_toString = tickers[key].volume_1day.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          tickers[key].volume_price_toString = volume_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          myArray.push(tickers[key]);
        }
      }
      this.tickerList = myArray;
    })
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }

  public sort(key){
    if (this.key == key && this.reverse == 'asc') {
      this.reverse = '';
      this.key = '';
    } else if (this.key == key && this.reverse == 'desc') {
      this.reverse = 'asc';
      this.key = key;
    } else {
      this.reverse = 'desc';
      this.key = key;
    }
  }
}
