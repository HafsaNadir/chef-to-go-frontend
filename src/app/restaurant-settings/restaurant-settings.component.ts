import { RestaurantsService } from './../core/services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/notification.service';
import { LoginService } from '../core/services/login.service';
import { Subscription } from 'rxjs';
import { environment } from './../../environments/environment';
import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-restaurant-settings',
  templateUrl: './restaurant-settings.component.html',
  styleUrls: ['./restaurant-settings.component.css'],
})
export class RestaurantSettingsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  businessName: string = "";
  details: string = "";
  mobileNumber: string = "";
  email: string = "";
  address: string = "";
  delivery: Boolean = false;
  deliveryFee: string = "";
  dineIn: Boolean = false;
  takeAway: Boolean = false;
  minOrder: string = "";
  phoneNumber: string = "";
  city: string = "";
  country: string = "";
  state: string = "";
  shortDescDiscount: string = ""
  longDescDiscount: string = ""
  tax: string = ""
  // time: any  = {
  //   monday: {},
  //   tuesday: {},
  //   wednesday: {},
  //   thursday: {},
  //   friday: {},
  //   saturday: {},
  //   sunday: {}
  // }
  timeMonday = {openTime: "", closeTime: ""}
  timeTuesday = {openTime: "", closeTime: ""}
  timeWednesday = {openTime: "", closeTime: ""}
  timeThursday = {openTime: "", closeTime: ""}
  timeFriday = {openTime: "", closeTime: ""}
  timeSaturday = {openTime: "", closeTime: ""}
  timeSunday = {openTime: "", closeTime: ""}
  isLoading: Boolean

  constructor(private loginService: LoginService, private restaurantService: RestaurantsService, private notifyService: NotificationService) {
    this.loginService.getRestaurant();
    this.subscriptions[0] = this.loginService.restaurant$.subscribe((data) => {
      if (data && data.length > 0) {
        console.log('data', data);
        this.businessName = data[0].name;
        this.details = data[0].details;
        this.phoneNumber = data[0].phoneNumber;
        this.email = data[0].email;
        this.address = data[0].address;
        this.delivery = data[0].delivery;
        this.deliveryFee = this.delivery ? data[0].deliveryFee : "";
        this.dineIn = data[0].dineIn;
        this.takeAway = data[0].takeAway;
        this.minOrder = data[0].minOrder;
        this.city = data[0].city;
        this.state = data[0].state;
        this.country = data[0].country;
        this.shortDescDiscount = data[0].shortDescDiscount
        this.longDescDiscount = data[0].longDescDiscount
        this.tax = data[0].tax
        // this.time = data[0].time ? data[0].time : {
        //   monday: {},
        //   tuesday: {},
        //   wednesday: {},
        //   thursday: {},
        //   friday: {},
        //   saturday: {},
        //   sunday: {}
        // }
        if(data[0].time){
          this.timeMonday = data[0].time.monday 
          this.timeTuesday = data[0].time.tuesday
          this.timeWednesday = data[0].time.wednesday
          this.timeThursday = data[0].time.thursday 
          this.timeFriday = data[0].time.friday
          this.timeSaturday = data[0].time.saturday
          this.timeSunday = data[0].time.sunday 
        }
        
      }
    });
  }
  resetHighlight() {
    let elem = document.getElementsByClassName('form-c');
    //elem.style = "color:red; border: 1px solid red";
    $('.form-c').css('border', '');
  }

  showHighlight(e) {
    let elem: HTMLElement = document.getElementById(e);
    elem.setAttribute('style', 'border: 1px solid red;');
  }

  ngOnInit(): void {}

  restaurantSetting() {
    this.resetHighlight();
    if (this.details === '') {
      this.notifyService.showWarning('Details required', 'Error');
      this.showHighlight('details');
      return false;
    }
    if (this.phoneNumber === "" || !Number(this.phoneNumber)) {
      this.notifyService.showWarning('Phone no required', 'Error');
      this.showHighlight('phoneNumber');
      return false;
    }
    if (this.address === "") {
      this.notifyService.showWarning('address required', 'Error');
      this.showHighlight('address');
      return false;
    }
    const obj = {
      name: this.businessName,
      details: this.details,
      phoneNumber: this.phoneNumber,
      email: this.email,
      address: this.address
    }
    this.isLoading = true
    console.log(obj)
    this.restaurantService.editRestaurant(obj)
    .subscribe(res => {
      if(res['success']){
        console.log(res);
        this.resetHighlight();
        this.isLoading = false
        $( "div.show-1" )
        .html( "<p><strong>Your changes have been successfully saved.</strong></p" ).show().delay(5000).fadeOut();
      }else {
        this.isLoading = false
        this.notifyService.showWarning(
          'Failed to update',
          'Error!'
        );
      }
    },
    (err) => {
      this.isLoading = false
      console.error('err', err.error.error);
      this.notifyService.showWarning(err.error.error, 'Error');
    })
  }
  
  modalClose(modalId) {
    $(`#${modalId}`).trigger('click');
  }
  
  editTimings(){
    const obj = {}
    // Object.values(this.time).forEach(x => {
    //   if(Object.keys(x).length < 2)
    //   count = count + 1
    // })
    // console.log(count)
    // if(count >= 1){
    //   this.notifyService.showWarning('Please enter timings', 'Error')
    //   return false;
    // }
    console.log(this.timeMonday)
    obj['monday'] = this.timeMonday
    obj['tuesday'] = this.timeTuesday
    obj['wednesday'] = this.timeWednesday
    obj['thursday'] = this.timeThursday
    obj['friday'] = this.timeFriday
    obj['saturday'] = this.timeSaturday
    obj['sunday'] = this.timeSunday

    const reqObject = {
      time: obj
    }
    this.restaurantService.editTimings(reqObject)
    .subscribe(res => {
      if(res['success']){
        console.log(res);
        this.modalClose('editModal')
        this.notifyService.showSuccess(
          'Successfully updated',
          'Success'
        );
        }else {
        this.notifyService.showWarning(
          'Failed to update',
          'Error!'
        );
      }
    },
    (err) => {
      console.error('err', err.error.error);
      this.notifyService.showWarning(err.error.error, 'Error');
    })
  }
  
  preferenceSetting() {
    this.resetHighlight();
    console.log(this.delivery,this.deliveryFee)
    if(this.delivery && this.deliveryFee === ''){
      this.notifyService.showWarning('delivery price required', 'Error');
      this.showHighlight('deliveryFee');
      return false;
    }
    if (this.minOrder === "" || !Number(this.minOrder)) {
      this.notifyService.showWarning('Min order required', 'Error');
      this.showHighlight('minOrder');
      return false;
    }
    if (this.state === "") {
      this.notifyService.showWarning('state required', 'Error');
      this.showHighlight('state');
      return false;
    }
    if (this.city === "") {
      this.notifyService.showWarning('City required', 'Error');
      this.showHighlight('city');
      return false;
    }
    if (this.country === "") {
      this.notifyService.showWarning('Country required', 'Error');
      this.showHighlight('country');
      return false;
    }
    if (this.shortDescDiscount === "") {
      this.notifyService.showWarning('Discount short Description required', 'Error');
      this.showHighlight('shortDescDiscount');
      return false;
    }
    if (this.longDescDiscount === "") {
      this.notifyService.showWarning('Discount long Description required', 'Error');
      this.showHighlight('longDescDiscount');
      return false;
    }
    if (this.tax === "" || !Number(this.tax)) {
      this.notifyService.showWarning('Tax required', 'Error');
      this.showHighlight('tax');
      return false;
    }

    const obj = {
     delivery: this.delivery,
     deliveryFee: this.deliveryFee,
     dineIn: this.dineIn,
     takeAway: this.takeAway,
     minOrder: this.minOrder,
     state: this.state,
     city: this.city,
     country: this.country,
     shortDescDiscount: this.shortDescDiscount,
     longDescDiscount: this.longDescDiscount,
     tax: this.tax
    }
    this.isLoading = true
    this.restaurantService.editPreferences(obj)
    .subscribe(res => {
      if(res['success']){
        console.log(res);
        this.resetHighlight()
        this.isLoading = false
        $( "div.show-2" )
        .html( "<p><strong>Your changes have been successfully saved.</strong></p" ).show().delay(5000).fadeOut();
        this.notifyService.showSuccess('Your changes have been successfully saved.', 'Success')
      }else {
        this.isLoading = false
        this.notifyService.showWarning(
          'Failed to update',
          'Error!'
        );
      }
    },
    (err) => {
      this.isLoading = false
      console.error('err', err.error.error);
      this.notifyService.showWarning(err.error.error, 'Error');
    })
  }
}
