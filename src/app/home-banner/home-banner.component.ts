import { Component, OnInit,NgZone,ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../core/notification.service'
import * as AOS from 'aos';
import * as jQuery from 'jquery';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})

export class HomeBannerComponent implements OnInit {

  private geoCoder;
    zoom: number;
    address: string;
    latitude: number;
    longitude: number;
    isLocation = false;

    @ViewChild('search')
    
    public searchElementRef: ElementRef;  

  constructor(private router : Router, private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,private notifyService : NotificationService) { }

  ngOnInit() {

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      console.log('this.geoCoder',this.geoCoder);
      this.zoom = 12;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        console.log('1',this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log('2',this.searchElementRef.nativeElement);
    
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            this.isLocation = false;

            return;
          }
    
          //set latitude, longitude and zoom
       this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          console.log('place change event call');
          this.isLocation = true;
        });
      });
    });
        
    sliderInit();
    console.log("sliderInit  call");
        AOS.init({
          once: true, 
        });
        
    if (typeof jQuery != 'undefined') {
        // jQuery is loaded => print the version
        //   alert(jQuery.fn.jquery);
    }else{
        // jQuery was not loaded
        console.error("No jquery");
    }
        
    $(window).resize(function(){
      bannerResize();
    });
    

    function bannerResize(){
      var banner_height = $(window).height() - $('header').outerHeight();
      if(banner_height > 0){
        $('.banner').css('height',banner_height+'px');
      }
      else{		
        $('.banner').css('height','700px');
      }
    }     

    $('.dots-col .dots').on('click','.dot',function(e){
      e.preventDefault();
      var slide_num = $(this).data('slide-num');
      slider(slide_num);
    });
    
    function slider(index){
      $('.banner-slider-track .slide').hide();
      $('.banner-slider-track .slide').each(function(i){
        if(i == index){
          var banner_heading = $(this).data('slide-heading');
          var banner_sub_heading = $(this).data('slide-sub-heading');	
          $('.banner-slider-content .heading').text(banner_heading);
          $('.banner-slider-content .sub-heading').text(banner_sub_heading);
          $(this).fadeIn('slow');
        }
      });
    
      $('.dots-col .dots .dot').each(function(i){
        $(this).removeClass('active');
        if(i == index){
          $(this).addClass('active');
        }
      });	
    }
    
    function sliderInit(){
      $('.banner-slider-track .slide').each(function(i){
        var banner_heading = $(this).data('slide-heading');
        var banner_sub_heading = $(this).data('slide-sub-heading');
        var html = '<li><a data-slide-num="'+i+'" href="#" class="dot"></a></li>';
        if(i == 0){
          $('.banner-slider-content .heading').text(banner_heading);
          $('.banner-slider-content .sub-heading').text(banner_sub_heading);
          html = '<li><a data-slide-num="'+i+'" href="#" class="dot active"></a></li>';
        }
        $('.dots-col .dots').append(html);
      });
    }   


  }
  

  getAddress(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder;

    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
        //  this.address = results[0].formatted_address;
        //  console.log('this.address',this.address);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    
    });
    }

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
      

  showPosition() {

    this.geoCoder.geocode({ 'location': { lat: this.latitude, lng: this.longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log('i am here',results[0].formatted_address);
          $('#address').val(results[0].formatted_address);
          this.isLocation = true;

       // console.log('this.address',this.addresss);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    
    });

  }

   searchs(){
     if(!this.isLocation){
      this.notifyService.showWarning("Error","Please select location from suggestion or click on navigation icon");
      return false;
     }
     let url = `./restaurants/lat/${this.latitude}/long/${this.longitude}`;
     console.log('url',url);
     return this.router.navigate([url]);



   }
   changeSearch(e){
      this.isLocation = false;

   }    


}
