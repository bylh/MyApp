import { CameraComponent } from './camera.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [CameraComponent],
  providers: [],
  imports: [
    CommonModule,
    CameraRoutingModule,
    IonicModule
  ]
})
export class CameraModule { }
