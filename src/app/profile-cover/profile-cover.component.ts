import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import * as AOS from 'aos';
import { NotificationService } from '../core/notification.service'
import { LoginService } from "../core/services/login.service";
import { Subscription } from 'rxjs';
import { environment } from './../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-profile-cover',
  templateUrl: './profile-cover.component.html',
  styleUrls: ['./profile-cover.component.css']
})
export class ProfileCoverComponent implements OnInit {

  subscriptions: Subscription[] = [];
  coverImage : any = null;
  logoImage : any = null;
  fileData1: File = null;
  fileData2: File = null;
  imageBase : string = null;
  
  businessName : string = null;
  constructor(private loginService : LoginService) {
    this.loginService.getRestaurant();
    this.imageBase = environment.imageBase;
    this.subscriptions[0] = this.loginService.restaurant$.subscribe(data => {
      if (data && data.length > 0) {
         console.log('data',data);
         this.coverImage =  environment.imageBase+ data[0].coverPhoto;
         this.logoImage = environment.imageBase+data[0].image;
         this.businessName = data[0].name;
      }else{

      }
    });  

   }

  ngOnInit(): void {
    var counter_switch = 0;
    var animated = 0;
    
    $(document).ready(function(){
    

      setTimeout(function(){
        AOS.init({
          once: true, 
        });
      },1000);    

      $('.food-cat').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        dots:false,		
        arrows: true,	
        focusOnSelect: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2, 
              slidesToScroll: 2,       
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      });      
    });

  }

  coverProgress(fileInput: any) {
    this.fileData1 = <File>fileInput.target.files[0];
    this.preview(1);
 }

 imageProgress(fileInput: any) {
  this.fileData2 = <File>fileInput.target.files[0];
  this.preview(2);
}

triggerImg(i){
 $('#image'+i).trigger('click');
}

preview(i) {
  // Show preview
  alert(i);
  var mimeType = (i === 1)? this.fileData1.type : this.fileData2.type;
   
  if (mimeType.match(/image\/*/) == null) {
    return;
  }
  var reader = new FileReader();      
  if(i === 1){
    reader.readAsDataURL(this.fileData1); 
    reader.onload = (_event) => { 
      this.coverImage = reader.result; 
      let formData1 = new FormData();
      console.log('this.fileData1',this.fileData1);
      formData1.append('file', this.fileData1);
  
      this.loginService.editRestaurantCover(formData1)
      .subscribe(res => {
        console.log(res);
      })
  
      
    }
  
  }else{
    reader.readAsDataURL(this.fileData2); 
    reader.onload = (_event) => { 
      this.logoImage = reader.result; 
      let formData = new FormData();
      formData.append('file', this.fileData2);
  
      this.loginService.editRestaurantImage(formData)
      .subscribe(res => {
        console.log(res);
      })
  
      
    }

      
    }
  
  }
}  



