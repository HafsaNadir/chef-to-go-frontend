import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import * as jQuery from 'jquery';
import { environment } from './../../environments/environment';
import { ActivatedRoute,Router } from '@angular/router';
import { NotificationService } from '../core/notification.service'
import { LoginService } from '../core/services/login.service';
import { OrderService } from '../core/services/order.service';
import * as io from 'socket.io-client'
declare var $: any;
@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.component.html',
  styleUrls: ['./vendor-orders.component.css']
})
export class VendorOrdersComponent implements OnInit {

  subscriptions = [];
  orderData : [];
  message: string = ""
  socket;
  orderId: string
  imageUrl: string = null;
  orderDetail: any

  constructor(private loginService : LoginService,
    private router : Router,private route: ActivatedRoute,
    private notifyService : NotificationService , private orderService : OrderService) { 

    this.socket = io(environment.SOCKET_ENDPOINT)
    this.imageUrl = environment.imageBase;

    this.orderService.getVendorOrders();
    this.subscriptions[0] = this.orderService.orderData$.subscribe(data => {
      if (data && data.length > 0) {
        this.orderData = data;
      }
    });  

  }

  modalClose(modalId) {
    $(`#${modalId}`).trigger('click');
  }

  orderModal(orderId){
    this.orderId = orderId
  }

  orderStatus(s,i){
    console.log(i);
    console.log(s);

    let status = "";
    if(s === 1){
      status = "delivered";
    }
    else if(s === 2){
      status = "accept";

    }
    else if(s === 3){
      status = "reject";

    }
    const object = {
      status,
    };
    
    this.orderService.changeStatus(i, object);
    setTimeout(() => {
      this.orderService.getVendorOrders();
      
    }, 1000);
  }

 
  
  sendMessage (id){
    if(!this.message){
      this.notifyService.showWarning('please enter the message', 'Error')
      return false
    }
      const data =  this.orderData.find(order => order['_id'] === id);
      console.log(data)
      const obj = {
        message: this.message,
        orderId: data['_id'],
        customerId: data['customerId'],
        restaurantId: data['restaurantId'],
        orderNo: data['orderId']
      }
      this.socket.emit('sendMessage', obj)
      $('.form-control').val('');
      this.modalClose('messageModal')

      this.socket.on('success', (text) => {
        this.notifyService.showSuccess(text, 'Success')
      });
      
      this.socket.on('error', (e) => {
        this.notifyService.showWarning(e, 'Error')
      });
      
  }
  orderDetailModal(id){
    this.orderDetail= this.orderData.find(order => order['_id'] === id)['orderDetails']
    //  = obj['orderDetail']
    console.log(this.orderDetail)
  }
  ngOnInit(): void {
  }

}
