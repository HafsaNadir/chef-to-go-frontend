import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Subject, BehaviorSubject, Observable } from "rxjs";

import { Router } from '@angular/router';
import { NotificationService } from '../notification.service'

@Injectable({
  providedIn: 'root'
})
export class TableService {
customerData$: BehaviorSubject<any> = new BehaviorSubject([]);

  //private _customerData: Subject<any> = new BehaviorSubject<any>([]);
 // public readonly customerData: Observable<any> = this._customerData.asObservable();

  constructor(private httpClient: HttpClient, private router : Router, private notifyService : NotificationService) {
  }
 //`${environment.baseUrl}/${environment.apiVersion}/application`,

  getAllCustomer(){
    let url = `${environment.baseUrl}${environment.apiVersion}customer`;
    //console.log('ur;')
    return this.httpClient.get(url).subscribe((res) => {
      if (res['success']) {
        this.customerData$.next(res['data']);
        

      } else {
        this.notifyService.showWarning("Something went wrong", "Error");

        // this.toaster.showError(res['error']);
        //this.error$.next(res['error']);
      }

      //this._customerData.next(response);
    });
  }
  
}
