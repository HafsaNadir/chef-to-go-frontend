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
export class SearchService {

  searchData$: BehaviorSubject<any> = new BehaviorSubject([]);
  restaurantData$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient, private router : Router, private notifyService : NotificationService) {
  }


  getSearch(lat,long){
    let url = `${environment.baseUrl}${environment.apiVersion}restaurant/search?lat=${lat}&long=${long}`;
    //console.log('ur;')
    return this.httpClient.get(url).subscribe((res) => {
      if (res['success']) {
        //searchData
        this.searchData$.next(res['data']);

      } else {
        this.notifyService.showWarning("Something went wrong", "Error");
      }

    });
  }

  getRestaurantBySlug(slug){
    let url = `${environment.baseUrl}${environment.apiVersion}restaurant/slug/${slug}`;
    return this.httpClient.get(url).subscribe((res) => {
      if (res['success']) {
        this.restaurantData$.next([res['data']]);

      } else {
        this.notifyService.showWarning("Something went wrong", "Error");
      }

    });
  }



}
