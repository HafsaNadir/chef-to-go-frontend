import { NotificationService } from './../core/notification.service';
import { ResetPasswordService } from './../core/services/reset-password.service';
import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = ""
  
  constructor(private resetPassService: ResetPasswordService, 
    private notifyService: NotificationService, private router: Router) { }
  
  resetHighlight(){
    
    let elem = document.getElementsByClassName("form-c");
    //elem.style = "color:red; border: 1px solid red";
    jQuery('.form-c').css('border','');
  }

  showHighlight(e){
    
    let elem: HTMLElement = document.getElementById(e);
    elem.setAttribute("style", "border: 1px solid red;"); 
  }

  requestPassword(){
    this.resetHighlight();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
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
    const obj = {
      email: this.email
    }
    this.resetPassService.forgotPassword(obj)
    .subscribe(res => {
      if(res['success']){
        this.router.navigate(['/forgot-message'])
      }  else {
          this.notifyService.showWarning(
            'Failed',
            'Error!'
          );
        }
      },
      (err) => {
        console.error('err', err.error.error);
        this.notifyService.showWarning(err.error.error, 'Error');
      }
    )
  }

  ngOnInit(): void {
  }

}
