import { NotificationService } from './../notification.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { HomeChefObj } from './../../shared/models/home-chef.model';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient, private notifyService: NotificationService) {

   }
   createHomeChef(obj: HomeChefObj) {
    return this.httpClient.post(
      `${environment.baseUrl}${environment.apiVersion}restaurant_owner`,
      obj
    );
  }
  
  createCustomer(obj) {
    console.log('hi')
    return this.httpClient.post(
      `${environment.baseUrl}${environment.apiVersion}customer`,
      obj
    );
  }

  resendEmail(refId){
    console.log(refId)
    return this.httpClient.post(
      `${environment.baseUrl}${environment.apiVersion}email/resend`,
      { refId })
      .subscribe(res => {
        if(res['success']){
          this.notifyService.showSuccess(res['data'], 'Success')
        }
        else {
          this.notifyService.showWarning('Something went wrong', 'Error');
        }
      },
      (err) => {
        const errObj = err.error.error;
        this.notifyService.showWarning(errObj, 'Error');
      }
  )}

  verifyEmail(hash, id){
    
    return this.httpClient.get(
      `${environment.baseUrl}${environment.apiVersion}email/verification/${hash}/${id}`
    )
  }
}

