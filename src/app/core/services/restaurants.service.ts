import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Subject, BehaviorSubject, Observable } from "rxjs";

import { Router } from '@angular/router';
import { NotificationService } from '../notification.service'


@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private httpClient: HttpClient, private router : Router, private notifyService : NotificationService) {
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

    getHeadersWithForm() {
      const httpOptions = {
        headers: new HttpHeaders({
          'x-access-token' : localStorage.getItem('token') ? localStorage.getItem('token') : undefined
          })
        };
        return httpOptions;
      }
  
  saveLocation(data){
    let url = `${environment.baseUrl}${environment.apiVersion}restaurant/edit/location`;
    return     this.httpClient.put(url, data,this.getHeaders());
  }
  
  editRestaurant(obj){
    let url = `${environment.baseUrl}${environment.apiVersion}restaurant/edit`
    return this.httpClient.put(url, obj, this.getHeaders())
  }
  
  editPreferences(obj){
    let url = `${environment.baseUrl}${environment.apiVersion}restaurant/edit/preferences`
    return this.httpClient.put(url, obj, this.getHeaders())
  }
  editTimings(obj){
    let url = `${environment.baseUrl}${environment.apiVersion}restaurant/edit/time`
    return this.httpClient.put(url, obj, this.getHeaders())
  }
 
}
