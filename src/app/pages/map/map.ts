import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { environment } from '../../../environments/environment';

const win = window as any;
const googleModule = win.google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  constructor(public confData: ConferenceData, public platform: Platform) { }

  async ngAfterViewInit() {
    const googleMaps = await getGoogleMaps(environment.Map.api_key);
    this.confData.getMap().subscribe(async (mapData: any) => {
      const mapEle = this.mapElement.nativeElement;
      // navigator.geolocation.getCurrentPosition(position => {
      //   let coords = position.coords;
      //   let latlng = new googleModule.maps.LatLng(coords.latitude, coords.longitude);
      //   console.log('getlaglng', latlng);
      // })
      let loaction, latlng
      try {
        console.log('start get position.......');
        let location = await getPosition();
        latlng = new googleModule.maps.LatLng(location.lat, location.lng);
        console.log('get success', location);
      } catch (err) {
        latlng = {
          lat: 39.907333,
          lng: 116.391083,
          center: true
        }
        console.log('getPosition err',err)
      }
      const map = new googleMaps.Map(mapEle, {
        // center: mapData.find((d: any) => d.center),
        center: latlng,
        zoom: 16,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
      });

      mapData.forEach((markerData: any) => {
        const infoWindow = new googleMaps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        const marker = new googleMaps.Marker({
          position: markerData,
          map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      googleMaps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
    });
  }
}


function getGoogleMaps(apiKey: string): Promise<any> {
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    // https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31
    // cn同时支持http和https
    script.src = `https://maps.google.cn/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}

function getPosition(): Promise<any> {
  return new Promise((resolve, reject) => {

    navigator.geolocation.getCurrentPosition(resp => {
      resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
    },
      err => {
        reject(err);
      }, {timeout: 5000});
  });

}

