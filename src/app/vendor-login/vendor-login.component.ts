import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/notification.service'
import * as jQuery from 'jquery';
import { LoginService } from '../core/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.css']
})
export class VendorLoginComponent implements OnInit {

  email : String = '';
  password : String = '';
  
    constructor(public loginService : LoginService,private notifyService : NotificationService ) { }
  
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
  
    login(){
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
      if (this.password.trim() === '') {
        this.notifyService.showWarning("password required", "Error");
        this.showHighlight('password');
        return false;
      }
  
      let login = {
        email : this.email,
        password : this.password
      }
      this.loginService.vendorLogin(login);
    }
  
  }
  