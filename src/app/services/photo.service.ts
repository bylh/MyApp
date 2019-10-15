import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import axios from 'axios';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];
  public randomPhotos: Array<any> = [];

  constructor(private camera: Camera, private storage: Storage) { }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });

      // Save all photos for later viewing
      this.storage.set('photos', this.photos);
    }, (err) => {
     // Handle error
     console.log("Camera issue: " + err);
    });

  }

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    });
  };

  async getRandomPhotos() {
    try {
      const res = await axios.request({
        url: `${environment.NestServerUrl}/photos`,
        method: 'get',
        params: {
          count: 20
        }
      });
      this.randomPhotos = res.data;
      return res.data as Array<Object>;
    } catch (err) {
      throw err;
    }
  }
}

class Photo {
  data: any;
}
