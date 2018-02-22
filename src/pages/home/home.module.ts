import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { OrderBy } from '../../app/sort';

@NgModule({
  declarations: [
    HomePage,
    OrderBy
  ],
  imports: [
    IonicPageModule.forChild(HomePage)
    //Ng2OrderModule
  ],
})
export class HomePageModule {}
