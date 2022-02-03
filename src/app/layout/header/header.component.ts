import { OrderService } from './../../core/services/order.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/notification.service'
import * as jQuery from 'jquery';
import { LoginService } from '../../core/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import * as io from 'socket.io-client'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  socket;

  isLogin: Boolean = false;

  imageUrl: string = null;
  notification: any = []
  nUrl : string

  subscriptions: Subscription[] = [];

  constructor(private router : Router,private loginService: LoginService, private notifyService: NotificationService,
    private orderService: OrderService) {

    this.imageUrl = environment.imageBase;
    let resp = this.loginService.checkSession();
    if (resp) {
      this.isLogin = true;
    }
    this.loginService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.isLogin = true;
      }
    });

    console.log('constructor')
    console.log('environment.SOCKET_ENDPOINT  he', environment.SOCKET_ENDPOINT);

    this.socket = io(environment.SOCKET_ENDPOINT)
    const token = localStorage.getItem('token');
    this.socket.emit('user', token);

    this.orderService.getOrderNotification()
    this.subscriptions[0] = this.orderService.orderNotification$.subscribe((data) => {
      console.log(data)
      this.notification = data
    })

  }

  logout() {
    this.loginService.logout();
  }
  ngOnInit() {
    this.socket.on('notification', (message) => {
      console.log('z', message)
      let audio = new Audio();
      audio.src = "../../../assets/ring_nextel.mp3";
      audio.load();
      audio.play();
      this.nUrl = "./orders";

      //alert(message)
      jQuery("#sockerMsg").html(message);
      jQuery('#pop-up-form-order').trigger("click");
    })
    this.socket.on('notify', (obj) => {
      this.nUrl = "./my-orders";

      jQuery("#sockerMsg").html(obj.message);
      jQuery("#orderId").append(obj.orderId);
      jQuery('#pop-up-form-order').trigger("click");
    })
  }
  // this.loginService.user$.
  goToMyOrder(){
    jQuery('#pop-up-form-order').trigger("click");

    let audio = new Audio();
    audio.pause();
      
    return this.router.navigate([this.nUrl]);

  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe()
    })
    this.orderService.orderNotification$.next(null)
  }
}
