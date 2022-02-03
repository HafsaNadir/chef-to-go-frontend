import { ProfileService } from './../core/services/profile.service';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import * as jQuery from 'jquery';
import { SearchService } from '../core/services/search.service';
import { environment } from './../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../core/notification.service'
import { LoginService } from '../core/services/login.service';
import { OrderService } from '../core/services/order.service';
import { timeStamp } from 'console';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  subscriptions = [];
  isLogin: Boolean = false;

  restaurantData: any;
  imageBase: string = null;
  //orderData : Array<{id: string, price: number,quantity : number}>;
  orderData: any = [];
  subPrice: number = 0.00;
  totalPrice: number = 0.00;
  user: any;
  isEdit = false;
  firstName: string = null;
  lastName: string = null;
  email: string = null;
  phoneNumber: string = null;
  orderPre: string = null;
  deliveryTrue = false;

  building: string = null
  floor: string = null
  area: string = null
  street: string = null

  constructor(private loginService: LoginService, private router: Router,
    private searchService: SearchService, private route: ActivatedRoute,
    private notifyService: NotificationService, private orderService: OrderService
    , private profileService: ProfileService) {

    this.profileService.getProfile();
    this.subscriptions[0] = this.profileService.profile$.subscribe(
      (data) => {
        console.log('profile data', data)
        if (data) {
          this.building = data?.address?.building
          this.street = data?.address?.street
          this.area = data?.address?.area
          this.floor = data?.address?.floor
        }
      }
    );
    this.loginService.user$.subscribe(user => {
      if (user) {
        this.firstName = user?.firstName;
        this.lastName = user?.lastName;
        this.email = user?.email;
        this.phoneNumber = user?.phoneNumber;
      }
    });

    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart !== null) {
      this.orderData = cart;
      this.calculate();
    }
    let cartDetail = JSON.parse(localStorage.getItem('cartDetail'));

    if (cartDetail != null) {
      console.log('cartDetail', cartDetail);
      this.searchService.getRestaurantBySlug(cartDetail.s);
    }

    this.subscriptions[0] = this.searchService.restaurantData$.subscribe(data => {
      if (data && data.length > 0) {
        this.restaurantData = data[0];
        console.log('this.restaurantData', this.restaurantData);
      }
    });



  }

  ngOnInit() {
    AOS.init({
      once: true, 
    });
}
  calculate() {
    this.subPrice = 0.00;
    this.totalPrice = 0.00;
    this.orderData.forEach((element, i) => {
      this.subPrice += element.price * element.quantity;
      this.totalPrice += element.price * element.quantity;
    });
  }
  orderQuantity(action, id) {
    this.orderData.forEach((element, i) => {
      if (element.quantity === 1 && action === 0) {
        if (element.id == id) {
          this.orderData.splice(i, 1);

        }

      } else {
        if (element.id == id) {
          if (action == 1) {
            ++this.orderData[i].quantity;
          }
          else {
            --this.orderData[i].quantity;

          }
        }

      }
    });
    this.calculate();
    localStorage.setItem('cart', JSON.stringify(this.orderData));

  }

  checkInCart(id) {
    if (this.orderData.length > 0) {
      let resp = false;
      this.orderData.forEach((element, i) => {
        if (element.id == id) {
          resp = true;
          this.orderData[i].quantity = ++element.quantity;
        }
      });
      return resp;
    }
    return false;

  }

  checkout() {
    if (this.orderPre == null) {
      this.notifyService.showError("Please select order preference", "Error");
      return false;
    }
    let cartDetail = JSON.parse(localStorage.getItem('cartDetail'));

    let orderObject = {
      total: this.totalPrice,
      subTotal: this.subPrice,
      order: this.orderData,
      i: cartDetail.i,
      orderType: this.orderPre
    };

    this.orderService.createOrders(orderObject);



  }

  editTrue(s) {
    this.isEdit = s;
    if(!this.isEdit){
      if (this.firstName === null || this.firstName === '') {
        this.notifyService.showWarning('First name required', 'Error')
        return false;
      }
  
      if (this.lastName === null || this.lastName === '') {
        this.notifyService.showWarning('Last name required', 'Error');
        return false;
      }
      if (this.phoneNumber === "" || !Number(this.phoneNumber)) {
        this.notifyService.showWarning('Phone no required', 'Error');
        return false;
      }
      const obj = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
      }
      this.orderService.updateDetails(obj)
        .subscribe(res => {
          if (res['success']) {
            console.log(res);
            this.notifyService.showSuccess(
              'Saved successfully',
              'Success!'
            );
          } else {
            this.notifyService.showWarning(
              'Failed to add the application form',
              'Error!'
            );
          }
        },
          (err) => {
            console.error('err', err.error.error);
            this.notifyService.showWarning(err.error.error, 'Error');
          }
        )
    }
    
  }

  orderPreferences() {
    if (this.orderPre === 'delivery') {
      this.deliveryTrue = true;
      return;
    }
    this.deliveryTrue = false;
  }

  deliveryAddr() {
    if (!this.building) {
      this.notifyService.showWarning('full address required', 'Error');
      return false;
    }
    if (!this.floor) {
      this.notifyService.showWarning('full address required', 'Error');
      return false;
    }
    if (!this.area) {
      this.notifyService.showWarning('full address required', 'Error');
      return false;
    }
    if (!this.street) {
      this.notifyService.showWarning('full address required', 'Error');
      return false;
    }
    const obj = {
      building: this.building,
      floor: this.floor,
      area: this.area,
      street: this.street
    }
    this.orderService.deliveryAddr(obj)
      .subscribe(res => {
        if (res['success']) {
          console.log(res);
          this.notifyService.showSuccess(
            'Saved successfully',
            'Success!'
          );
        } else {
          this.notifyService.showWarning(
            'Failed to add the application form',
            'Error!'
          );
        }
      },
        (err) => {
          console.error('err', err.error.error);
          this.notifyService.showWarning(err.error.error, 'Error');
        }
      )
  }

}
