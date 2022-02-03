import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Subject, BehaviorSubject, Observable } from "rxjs";

import { Router } from '@angular/router';
import { NotificationService } from '../notification.service'
import * as io from 'socket.io-client'


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  socket;
  orderData$: BehaviorSubject<any> = new BehaviorSubject([]);
  orderNotification$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient, private router : Router, private notifyService : NotificationService) {
    console.log('environment.SOCKET_ENDPOINT  or',environment.SOCKET_ENDPOINT);
    this.socket = io(environment.SOCKET_ENDPOINT)

  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token' : localStorage.getItem('token') ? localStorage.getItem('token') : undefined
        })
      };
      return httpOptions;
    }

    createOrders(payload){
      let url = `${environment.baseUrl}${environment.apiVersion}order`;
       this.httpClient.post(url, payload,this.getHeaders()).subscribe(resp =>{
          if(resp['success']){
            this.orderData$.next(resp['data']);
            this.socket.emit('send',resp['data']);

            this.notifyService.showSuccess("Order successfully Placed","Success");
            localStorage.removeItem('cartDetail');
            localStorage.removeItem('cart');
            return this.router.navigate(['./my-orders']);
  
          }else{
            this.notifyService.showError("Something went wrong","Error");

          }
       })
    }
    getOrders(){
      let url = `${environment.baseUrl}${environment.apiVersion}order`;
      //console.log('ur;')
      return this.httpClient.get(url,this.getHeaders()).subscribe((res) => {
        if (res['success']) {
          console.log(res);
  
          this.orderData$.next(res['data']);
        } else {
          this.notifyService.showWarning("Something went wrong", "Error");
        }
  
      });
    }
    getVendorOrders(){
      let url = `${environment.baseUrl}${environment.apiVersion}order/vendor`;
      //console.log('ur;')
      return this.httpClient.get(url,this.getHeaders()).subscribe((res) => {
        if (res['success']) {
          console.log(res);
  
          this.orderData$.next(res['data']);
        } else {
          this.notifyService.showWarning("Something went wrong", "Error");
        }
  
      });
    }

    getOrderNotification() {
      
      let url = `${environment.baseUrl}${environment.apiVersion}order/notification`;

      return this.httpClient.get(url,this.getHeaders()).subscribe((res) => {
        if (res['success']) {
          console.log(res);
          this.orderNotification$.next(res['data']);
        }  
  
    }) 
  }

  changeStatus(id, status){
    let url = `${environment.baseUrl}${environment.apiVersion}order`;
    return this.httpClient.put(`${url}/status/${id}`, status, this.getHeaders()).subscribe(
      (res) => {
        if (res['success']) {
          this.notifyService.showSuccess('Order status successfully updated', 'Success');
          
        } else {
          this.notifyService.showWarning('Something went wrong', 'Error');
        }
      },
      (err) => {
        const errObj = err.error.error;
        this.notifyService.showWarning(errObj, 'Error');
      }
    );
  }
  deliveryAddr(obj){
    return  this.httpClient.put(`${environment.baseUrl}${environment.apiVersion}customer/edit/addr`, obj,this.getHeaders());
  }
  updateDetails(obj){
    return  this.httpClient.put(`${environment.baseUrl}${environment.apiVersion}customer/edit/details`, obj,this.getHeaders());
  }
}