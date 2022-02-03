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
export class CategoryService {
  categoryData$: BehaviorSubject<any> = new BehaviorSubject([]);
  menuData$: BehaviorSubject<any> = new BehaviorSubject([]);

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
  

  getCategory(){
    let url = `${environment.baseUrl}${environment.apiVersion}category`;
    //console.log('ur;')
    return this.httpClient.get(url).subscribe((res) => {
      if (res['success']) {
        console.log(res);

        this.categoryData$.next(res['data']);
      } else {
        this.notifyService.showWarning("Something went wrong", "Error");
      }

    });
  }


  getMenu(){
    let url = `${environment.baseUrl}${environment.apiVersion}menu/vendor`;
    return this.httpClient.get(url,this.getHeaders()).subscribe((res) => {
      if (res['success']) {
        console.log(res);
        this.menuData$.next(res['data']);
      } else {
        this.notifyService.showWarning("Something went wrong", "Error");
      }

    });
  }

  createMenu(formData){
    let url = `${environment.baseUrl}${environment.apiVersion}menu`;
    return     this.httpClient.post(url, formData,this.getHeadersWithForm());
  }

  editMenu(formData,id){
    let url = `${environment.baseUrl}${environment.apiVersion}menu/edit/${id}`;
    return     this.httpClient.put(url, formData,this.getHeadersWithForm());
  }

  addDiscountMenu(obj ,id){
    let url = `${environment.baseUrl}${environment.apiVersion}menu/discount/${id}`;
    return     this.httpClient.put(url, obj ,this.getHeadersWithForm());
  }

  deleteMenu(id){
    let url = `${environment.baseUrl}${environment.apiVersion}menu`;

    return this.httpClient.put(`${url}/delete/${id}`, {}, this.getHeaders())
  }

  chageMenuStatus(id,body){
    let url = `${environment.baseUrl}${environment.apiVersion}menu`;

    this.httpClient.put(`${url}/status/${id}`, body, this.getHeaders()).subscribe((res) => {
      if (res['success']) {
        this.getMenu();
        this.notifyService.showSuccess('Menu is available for public now.', 'Success')

      } else {
        this.notifyService.showWarning("Something went wrong", "Error");
      }

    });
  }
   
 
  addVariation(data,id){
    let url = `${environment.baseUrl}${environment.apiVersion}menu/vendor/variation/`+id;
    return     this.httpClient.post(url, data,this.getHeaders());
  }


}
