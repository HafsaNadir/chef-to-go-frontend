import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private httpClient: HttpClient) { }
  
  forgotPassword(obj){
    const url = `${environment.baseUrl}${environment.apiVersion}forgotPassword`
    return this.httpClient.post(url, obj)
  }
  resetPassword(hash, id, obj){
    const url = `${environment.baseUrl}${environment.apiVersion}reset/${hash}/${id}`
    return this.httpClient.post(url, obj)
  }
}
