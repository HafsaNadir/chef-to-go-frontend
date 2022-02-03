import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import * as jQuery from 'jquery';
import * as io from 'socket.io-client'
import { environment } from './../../environments/environment';


declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  socket;



  constructor() { 



  }

  ngOnInit() {
    AOS.init({
      once: true, 
    });


  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
       alert('2');
     // x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  showPosition(position) {
    console.log('position',position);
   // x.innerHTML = "Latitude: " + position.coords.latitude +
    //"<br>Longitude: " + position.coords.longitude;
  }


}
