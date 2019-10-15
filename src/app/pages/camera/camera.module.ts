import { CameraComponent } from './camera.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CameraComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    CameraRoutingModule,
    IonicModule
  ]
})
export class CameraModule { }
