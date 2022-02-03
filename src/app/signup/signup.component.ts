import { LoginService } from './../core/services/login.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/notification.service'
import * as jQuery from 'jquery';
import { RegistrationService } from '../core/services/registration.service';
import { ApiResponse } from '../shared/models/response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


 firstName  : String = null;
 lastName : String = null;
 phoneNo : String | Number = '';
 email : String = '';
 password : String = '';
 confirmPassword : String= '';
 isLoading: Boolean

 constructor(private notifyService : NotificationService , 
  private rs : RegistrationService , 
  private router : Router,
  private authService: SocialAuthService,
  private loginService: LoginService
  ) { }

  ngOnInit() {
  }
  resetHighlight(){
    let elem = document.getElementsByClassName("form-c");
    //elem.style = "color:red; border: 1px solid red";
    jQuery('.form-c').css('border','');

  }

  showHighlight(e){
    
    let elem: HTMLElement = document.getElementById(e);
    elem.setAttribute("style", "border: 1px solid red;");
    
  }
  register(){
    this.resetHighlight();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.firstName === null) {
      this.notifyService.showWarning("First name required", "Error");
      this.showHighlight('firstName');
      return false;
     }

    if (this.lastName === null) {
      this.notifyService.showWarning("Last name required", "Error");
      this.showHighlight('lastName');
      return false;
    }

    if (this.phoneNo === null || !Number(this.phoneNo)) {
      this.notifyService.showWarning("Phone no required", "Error");
      this.showHighlight('phoneNo');
      return false;
    }
    if (this.email === null) {
      this.notifyService.showWarning("email required", "Error");
      this.showHighlight('email');
      return false;
    }

    if (!re.test(String(this.email).toLowerCase())) {
      this.notifyService.showWarning("Invalid email required", "Error");
      this.showHighlight('email');
      return false;
    }
    if (this.password.trim() === '') {
      this.notifyService.showWarning("password required", "Error");
      this.showHighlight('password');
      return false;
    }

    if (this.confirmPassword.trim() === '') {
      this.notifyService.showWarning("confirm Password required", "Error");
      this.showHighlight('confirmPassword');
      return false;
    }
    if (this.password.trim() !== this.confirmPassword.trim()) {
      this.notifyService.showWarning("Password Dont Matched", "Error");
      this.showHighlight('confirmPassword');

      return false;
    }
    let registrationObjects = {
      firstName : this.firstName,
      lastName : this.lastName,
      phoneNumber : this.phoneNo,
      email : this.email,
      password : this.password

    };
    this.isLoading = true
    this.rs
    .createCustomer(registrationObjects)
    .subscribe(
      (res: ApiResponse) => {
        console.log('res', res);
        if (res.success) {
          this.isLoading = false
          this.notifyService.showSuccess('You have successfully register','Success');
          console.log(res.data._id)
          localStorage.setItem('refId', res.data._id)
          jQuery('.form-c').val('');
          this.router.navigate(['/account_verification']);
        } else {
          this.isLoading = false
          this.notifyService.showWarning(
            'Failed to add the application form',
            'Error!'
          );
        }
      },
      (err) => {
        this.isLoading = false
        console.error('err', err.error.error);
        this.notifyService.showWarning(err.error.error, 'Error');
      }
    );    

}  
  fbLogin(){
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {  
        console.log(user); 
        const obj = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
          email: user.email
        }
        this.loginService.socialLogin(obj)
  })
}

}
