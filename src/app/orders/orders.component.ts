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
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  subscriptions = [];
  orderData : [];
  imageUrl: string = null;
  orderDetail: string
  message: string = ""
  socket;
  orderId: string

  constructor(private loginService : LoginService,private router : Router,private route: ActivatedRoute,private notifyService : NotificationService, private orderService : OrderService) { 
    this.socket = io(environment.SOCKET_ENDPOINT)
    this.orderService.getOrders();
    this.imageUrl = environment.imageBase;

    this.subscriptions[0] = this.orderService.orderData$.subscribe(data => {
      if (data && data.length > 0) {
        console.log(data)
        this.orderData = data;
      }
    });  

  }
  orderDetailModal(id){
    this.orderDetail= this.orderData.find(order => order['_id'] === id)['orderDetails']
    //  = obj['orderDetail']
    console.log(this.orderDetail)
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
      this.socket.emit('sendMessageToRestaurant', obj)
      $('.form-control').val('');
      this.modalClose('messageModal')

      this.socket.on('success', (text) => {
        this.notifyService.showSuccess(text, 'Success')
      });
      
      this.socket.on('error', (e) => {
        this.notifyService.showWarning(e, 'Error')
      });
      
  }
  
  orderModal(orderId){
    this.orderId = orderId
  }

  modalClose(modalId) {
    $(`#${modalId}`).trigger('click');
  }
  
  ngOnInit() {
    AOS.init({
      once: true, 
    });
}

}
