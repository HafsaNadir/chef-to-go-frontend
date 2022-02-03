import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { NotificationService } from '../core/notification.service'
import { RestaurantsService } from "../core/services/restaurants.service";
import { LoginService } from '../core/services/login.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-mark-location',
  templateUrl: './mark-location.component.html',
  styleUrls: ['./mark-location.component.css']
})
export class MarkLocationComponent implements OnInit {
  title: string = "";
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  subscriptions: Subscription[] = [];

  constructor(private loginService: LoginService,  private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private restaurantsService: RestaurantsService ,private notifyService : NotificationService) {
      this.loginService.getRestaurant();
      this.subscriptions[0] = this.loginService.restaurant$.subscribe((data) => {
        if (data && data.length > 0) {
          console.log('data', data[0].location.coordinates[0]);
          console.log('data', data[0].location.coordinates[1]);
          this.longitude = data[0].location.coordinates[0];
          this.latitude = data[0].location.coordinates[1];
          this.getAddress(this.latitude, this.longitude);


           //data[0].location;
          
        }
      });
  
     }

    

  ngOnInit(): void {
 //load Places Autocomplete
 this.mapsAPILoader.load().then(() => {
  this.setCurrentLocation();
  this.geoCoder = new google.maps.Geocoder;


  let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
  autocomplete.addListener("place_changed", () => {
    this.ngZone.run(() => {
      //get the place result
      let place: google.maps.places.PlaceResult = autocomplete.getPlace();

      //verify result
      if (place.geometry === undefined || place.geometry === null) {
        return;
      }

      //set latitude, longitude and zoom
      this.latitude = place.geometry.location.lat();
      this.longitude = place.geometry.location.lng();
      this.zoom = 12;
      console.log('place change event call');
      this.saveLocation(this.latitude,this.longitude);
      this.getAddress(this.latitude, this.longitude)
    });
  });
});
}

// Get Current Location Coordinates
private setCurrentLocation() {
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.zoom = 8;
    this.getAddress(this.latitude, this.longitude);

  });
}
}


markerDragEnd($event: MouseEvent) {
console.log($event);
this.latitude = $event.coords.lat;
this.longitude = $event.coords.lng;
console.log('markerDragEnd',this.latitude+' ---'+this.longitude);
this.getAddress(this.latitude, this.longitude);
this.saveLocation(this.latitude, this.longitude);
}

saveLocation(lat,long){
  this.restaurantsService.saveLocation({lat,long})
  .subscribe(res => {

  })

}

getAddress(latitude, longitude) {
this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  console.log(results);
  console.log(status);
  if (status === 'OK') {
    if (results[0]) {
      this.zoom = 12;
      this.address = results[0].formatted_address;
    } else {
      window.alert('No results found');
    }
  } else {
    window.alert('Geocoder failed due to: ' + status);
  }

});
}

}
