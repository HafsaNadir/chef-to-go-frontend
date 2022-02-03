import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../core/services/profile.service';
import { NotificationService } from '../core/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../shared/models/response.model';
import { environment } from './../../environments/environment';
import * as $ from 'jquery';
declare var $: any;
import * as AOS from 'aos';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  subscriptions: Subscription[] = [];

  imageUrl: string = null;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  firstNameE : string = null;
  lastNameE : string = null;
  emailE: string = null
  phoneNumberE: string = "";
  imageE: string = null;
  previewUrlE: any = null;

  currentPassword: string = ""
  newPassword: string = ""
  confirmPassword: string = ""
  isLoading: Boolean
  
  constructor(
    private notifyService: NotificationService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.imageUrl = environment.imageBase;
    this.profileService.getProfile();
    this.subscriptions[0] = this.profileService.profile$.subscribe(
      (data) => {
        if (data) {
          this.firstNameE = data.firstName
          this.lastNameE = data.lastName
          this.emailE = data.email
          this.phoneNumberE = data.phoneNumber
          this.imageE = data.profilePicture
          this.previewUrlE = this.imageUrl+data.profilePicture;
        }
      }
    );
  }

  ngOnInit(): void {
    AOS.init({
      once: true, 
    });
}
  
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrlE = reader.result;
    };
  }

  removeImg(){
    this.previewUrlE = null;
  }

  resetHighlight() {
    let elem = document.getElementsByClassName('form-control');
    //elem.style = "color:red; border: 1px solid red";
    $('.form-control').css('border', '');
  }

  showHighlight(e) {
    let elem: HTMLElement = document.getElementById(e);
    elem.setAttribute('style', 'border: 1px solid red;');
  }
  
  onSubmitEdit() {
    console.log('this.fileData',this.fileData);
    console.log(this.firstNameE)
  
    this.resetHighlight();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.firstNameE === null || this.firstNameE === '') {
      this.notifyService.showWarning('First name required', 'Error');
      this.showHighlight('firstNameE');
      return false;
    }

    if (this.lastNameE === null || this.lastNameE === '') {
      this.notifyService.showWarning('Last name required', 'Error');
      this.showHighlight('lastNameE');
      return false;
    }
    if (this.phoneNumberE === "" || !Number(this.phoneNumberE)) {
      this.notifyService.showWarning('Phone no required', 'Error');
      this.showHighlight('phoneNumberE');
      return false;
    }
    const formData = new FormData();
      formData.append('file', this.fileData);
      formData.append('firstName', this.firstNameE);
      formData.append('lastName', this.lastNameE);
      formData.append('email', this.emailE);
      formData.append('phoneNumber', this.phoneNumberE);
      formData.append('profilePicture', this.imageE);
      this.isLoading = true
      
      
      
      
      
      this.profileService.editProfile(formData)
      .subscribe(res => {
        if(res['success']){
          console.log(res);
          this.isLoading = false
          $( "div.show-1" )
            .html( "<p><strong>Your changes have been successfully saved.</strong></p>" ).show().delay(5000).fadeOut();
        }else {
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
    )
  }
  editPass(){
    this.resetHighlight();

    if (this.currentPassword.trim() === '') {
      this.notifyService.showWarning('password required', 'Error');
      this.showHighlight('currentPassword');
      return false;
    }
    if (this.newPassword.trim() === '') {
      this.notifyService.showWarning('password required', 'Error');
      this.showHighlight('newPassword');
      return false;
    }

    if (this.confirmPassword.trim() === '') {
      this.notifyService.showWarning('confirm Password required', 'Error');
      this.showHighlight('confirmPassword');
      return false;
    }
    if (this.newPassword.trim() !== this.confirmPassword.trim()) {
      this.notifyService.showWarning('Password Dont Matched', 'Error');
      this.showHighlight('confirmPassword');
      return false;
    }
    const obj = {
      currentPass: this.currentPassword,
      newPass: this.newPassword
    }
    this.isLoading = true
    this.profileService.editPass(obj)
    .subscribe(res => {
      if(res['success']){
        console.log(res);
        this.isLoading = false
        $( "div.show-2" )
        .html( "<p><strong>Password updated successfully.</strong></p" ).show().delay(5000).fadeOut();
        $('.form-control').val('');
      }else {
        this.isLoading = false
        this.notifyService.showWarning(
          'Failed to update',
          'Error!'
        );
      }
    },
    (err) => {
      this.isLoading = false
      console.error('err', err.error.error);
      this.notifyService.showWarning(err.error.error, 'Error');
    })
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.profileService.profile$.next([]);
  }
}
