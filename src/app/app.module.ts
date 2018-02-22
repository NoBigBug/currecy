import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { CurrencyServiceProvider } from '../providers/currency-service/currency-service';

export const firebaseConfig = {
  apiKey: "AIzaSyD66GzSFler9VXkFhOfRIUnMw5r-QIK1sc",
  authDomain: "currency-9d47a.firebaseapp.com",
  databaseURL: "https://currency-9d47a.firebaseio.com",
  projectId: "currency-9d47a",
  storageBucket: "currency-9d47a.appspot.com",
  messagingSenderId: "462842797975"
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    HttpServiceProvider,
    CurrencyServiceProvider
  ]
})
export class AppModule {}
