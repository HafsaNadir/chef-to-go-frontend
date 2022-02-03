import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from './../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  restaurant$: BehaviorSubject<any> = new BehaviorSubject({});

  token: string = this.getToken();
  isLoading: Boolean
  constructor(private httpClient: HttpClient, private router : Router, private notifyService : NotificationService) {

  }
  getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : undefined;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  tokenValidateFromServer(){
    let url = `${environment.baseUrl}${environment.apiVersion}customer/validate`;
    return this.httpClient.get(url,this.getHeaders()).subscribe((res) => {
      if (res['success']) {
        console.log(res);
        this.user$.next(res['data']);
      } else {
       this.logout();
       console.log('me here 0')
      }

    }
    , err => {
      this.notifyService.showWarning("Error","Please login again");
     this.logout();
     console.log('me here 1')


    });

  } 
  
  removeToken() {
    localStorage.removeItem('token');
  }
  checkSession(){
    const user = this.user$.getValue();
    if (user) {
      return true;
    }
    else if (this.getToken()) {
      this.tokenValidateFromServer();
      return true;
    }
    else{
      return false;
    }

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


  socialLogin(user: Object) {
    this.isLoading = true
    let url = environment.baseUrl+environment.apiVersion + "customer/login/social";
    this.httpClient.post(`${url}`, user)
      .subscribe(res => {
        console.log('login call',res);
        if (res['success']) {
          this.isLoading = false
          console.log(res['data']['token'])
          this.setToken(res['data']['token']);
          this.user$.next(res['data']['user']);
            return this.router.navigate(['./']);

        } else {
          this.isLoading = false
          this.notifyService.showWarning("Something went wrong", "Error");
        }
      }, err => {
        this.isLoading = false
        const errObj = err.error.error;
        this.notifyService.showWarning("Error", "Error");
      });
  }
  login(user: Object) {
    this.isLoading = true
    let url = environment.baseUrl+environment.apiVersion + "customer/login";
    this.httpClient.post(`${url}`, user)
      .subscribe(res => {
        console.log('login call',res);
        if (res['success']) {
          this.isLoading = false
          this.setToken(res['data']['token']);
          this.user$.next(res['data']['user']);
          let cart =  JSON.parse(localStorage.getItem('cart'));
          if(cart !== null){
            this.isLoading = false
            return this.router.navigate(['./checkout']);
     
           }
            return this.router.navigate(['./']);

        } else {
          this.isLoading = false
          this.notifyService.showWarning("Something went wrong", "Error");
        }
      }, err => {
        this.isLoading = false
        const errObj = err.error.error;
        this.notifyService.showWarning(errObj, "Error");
      });
  }

  
  vendorLogin(user: Object) {
    this.isLoading = true
    let url = environment.baseUrl+environment.apiVersion+"restaurant_owner/login";
    this.httpClient.post(`${url}`, user)
      .subscribe(res => {
        console.log('login call',res);
        if (res['success']) {
          this.isLoading = false
          this.setToken(res['data']['token']);
          this.user$.next(res['data']['user']);
          this.getRestaurant();

            return this.router.navigate(['./']);

        } else {
          this.isLoading = false
          this.notifyService.showWarning("Something went wrong", "Error");
        }
      }, err => {
        this.isLoading = false
        const errObj = err.error.error;
        this.notifyService.showWarning(errObj, "Error");
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.user$.next(undefined);
    this.router.navigate(['/login']);
  }
  isLoggedIn(state) {
    const user = this.user$.getValue();
    if (user) {
      if (state.url !== '/login' && state.url !== '/signup') {
        return of(true);
      } else {
        /*
        if (user['user_tc_accepted'] == '0') {
          this.router.navigate(['/terms']);
        } else if (user['user_help_completed'] != '1') {
          this.router.navigate(['/signup-details']);
        } else {
          this.router.navigate(['/dashboard']);
        }
        */
        this.router.navigate(['/home']);
      }
    } else if (this.getToken()) {
   //   this.tokenValidateFromServer();      
      if (state.url === '/login' || state.url === '/signup') {
        this.router.navigate(['/']);
      } else {
        return of(true);

      }
    } else if (state.url === '/login' || state.url === '/signup') {
      return of(true);
    } else {
      this.router.navigate(['/login']);
    }
  }  

  getHeadersWithForm() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token' : localStorage.getItem('token') ? localStorage.getItem('token') : undefined
        })
      };
      return httpOptions;
    }

  
  getRestaurant(){
    let url = `${environment.baseUrl}${environment.apiVersion}restaurant`;
    return this.httpClient.get(url,this.getHeaders()).subscribe((res) => {
      if (res['success']) {
        console.log('getRestaurant',res);
        console.log('getRes 1',res['data']);
        this.restaurant$.next([res['data']]);
      } else {
         this.notifyService.showWarning("Something went wrong", "Error in get res");
      }

    });
  }

  editRestaurantImage(formData){
    let url = `${environment.baseUrl}${environment.apiVersion}restaurant/image`;
    return     this.httpClient.post(url, formData,this.getHeadersWithForm());
  }

  editRestaurantCover(formData){
    let url = `${environment.baseUrl}${environment.apiVersion}restaurant/image/cover`;
    return     this.httpClient.post(url, formData,this.getHeadersWithForm());
  }

}
