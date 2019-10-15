import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  currentImage: any;

  constructor(public photoService: PhotoService) {  }

  async ngOnInit() {
    this.photoService.loadSaved();
    await this.photoService.getRandomPhotos();
  }

}
