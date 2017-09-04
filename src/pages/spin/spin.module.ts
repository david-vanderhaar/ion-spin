import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpinPage } from './spin';

@NgModule({
  declarations: [
    SpinPage,
  ],
  imports: [
    IonicPageModule.forChild(SpinPage),
  ],
})
export class SpinPageModule {}
