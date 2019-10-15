import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  currentImage: any;

  params =  {
    query: '',
    count: 20
  }
  constructor(public photoService: PhotoService) {  }

  async ngOnInit() {
    this.photoService.loadSaved();
    await this.photoService.getRandomPhotos();
  }
  async refresh() {
    await this.photoService.getRandomPhotos(this.params);
  }

  async previewImg(src: string) {
    window.open(src)
  }

  async searchPhotos() {
    await this.photoService.getRandomPhotos(this.params);
  }

}
