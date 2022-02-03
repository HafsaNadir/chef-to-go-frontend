import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import * as AOS from 'aos';
import { SearchService } from '../core/services/search.service';
import { environment } from './../../environments/environment';
import { ActivatedRoute,Router } from '@angular/router';
import { NotificationService } from '../core/notification.service'
import { LoginService } from '../core/services/login.service';

declare var $: any;

@Component({
  selector: 'app-restruant-detail',
  templateUrl: './restruant-detail.component.html',
  styleUrls: ['./restruant-detail.component.css']
})
export class RestruantDetailComponent implements OnInit {
  subscriptions = [];
  isLogin : Boolean = false;

  restaurantData : any;
  imageBase : string = null;
  //orderData : Array<{id: string, price: number,quantity : number}>;
  orderData : any = [];
  subPrice : number = 0.00; 
  totalPrice : number = 0.00; 

  constructor(private loginService : LoginService,private router : Router,private searchService : SearchService,private route: ActivatedRoute,private notifyService : NotificationService) { 
    this.imageBase = environment.imageBase;

    let resp = this.loginService.checkSession();
    if(resp){
      this.isLogin = true;
    }
    this.loginService.user$.subscribe(user => {
      if (user) {
        this.isLogin = true;
      }
     });
     

     let cart =  JSON.parse(localStorage.getItem('cart'));
     if(cart !== null){
       this.orderData = cart;
       this.calculate();
     }


    this.route.params.subscribe(params => {
      if (params['name']) {
        this.searchService.getRestaurantBySlug(params['name']);
      }
    });

    this.subscriptions[0] = this.searchService.restaurantData$.subscribe(data => {
      if (data && data.length > 0) {
        this.restaurantData = data[0];
        console.log('this.restaurantData',this.restaurantData);
        setTimeout(() => {
          $('.detail_slider_wrapper .owl-carousel').slick({
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
                  slidesToShow: 5,
                  slidesToScroll: 5,
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 3,   
                  slidesToScroll: 3,     
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
          $(".cat-link").click(function(e) {
            e.preventDefault();
            $(".cat-link").removeClass('active');
            var cat_id = $(this).attr("href");
            $('html,body').animate({scrollTop: $(cat_id).offset().top},'slow');
            $(this).addClass('active');
          });
      
                
        }, 1000);
      }
    });  



  }

  ngOnInit() {
    $(document).ready(function(){
      setTimeout(function(){
        AOS.init({
          once: true, 
        });
      },1000);    

    
      $('.count').prop('disabled', true);
      $(document).on('click','.plus',function(){
      $('.count').val(parseInt($('.count').val()) + 1 );
      });
      $(document).on('click','.minus',function(){
        $('.count').val(parseInt($('.count').val()) - 1 );
          if ($('.count').val() == 0) {
          $('.count').val(1);
        }
      });
    });



  }
  calDiscount(md){
    if(!md.isDiscount){
      return md.price;
    }
    else if(md.discountType === "percentage"){
       return md.price - (md.price*md.discountValue/100);
    }
    else if(md.discountType === "totalamt"){
      return md.price- md.discountValue;
    }

  }

  addToCart(id,i){
    
     let m =  this.restaurantData.menuData[i];
     let price = this.calDiscount(m); 
     let orderObj = {
      id : m._id,
      price : price,
      name :  m.name,
      quantity : 1
      };

      let cartDetail =  JSON.parse(localStorage.getItem('cartDetail'));
      if(cartDetail !== null){
        console.log('cartDetail-1',cartDetail);
         if(cartDetail.i != this.restaurantData.menuData[0].restaurantId || cartDetail.s != this.restaurantData.slug ){
          localStorage.removeItem('cartDetail');
          localStorage.removeItem('cart');
           
         }
      }else{
       let data =    {
          i : this.restaurantData.menuData[0].restaurantId,
          s : this.restaurantData.slug
        };
        localStorage.setItem('cartDetail', JSON.stringify(data));
        console.log('cartDetail-0',data);

      }
 

      
      if(!this.checkInCart(id)){
        this.orderData.push(orderObj);
      }
      localStorage.setItem('cart', JSON.stringify(this.orderData));
     this.calculate();
  }

  calculate(){
    this.subPrice = 0.00;
    this.totalPrice = 0.00;
    this.orderData.forEach((element,i) => {
        this.subPrice +=  element.price * element.quantity; 
        this.totalPrice +=  element.price * element.quantity; 
    });
  }

  orderQuantity(action,id){
    this.orderData.forEach((element,i) => {
      if(element.quantity === 1 && action === 0){
        if(element.id == id){
            this.orderData.splice(i, 1);
                    
        }

        }else{
          if(element.id == id){
            if(action == 1){
              ++this.orderData[i].quantity;
            }
            else{
              --this.orderData[i].quantity;
    
            }          
        }
  
      }
  });
    this.calculate();
    localStorage.setItem('cart', JSON.stringify(this.orderData));

  }

  checkInCart(id){
    if(this.orderData.length > 0){
      let resp = false;
      this.orderData.forEach((element,i) => {
          if(element.id == id){
            resp = true;
            this.orderData[i].quantity =  ++ element.quantity; 
          }
      });
      return resp;
    }
    return false;

  }

  checkout(){
    if(this.orderData.length === 0){
      this.notifyService.showWarning("Please add atleast one item","Error");
      return false;
    }
    else if(!this.isLogin){
      this.notifyService.showWarning("You need to login first","Message");
      
    }
    else{
      return this.router.navigate(['./checkout']);

    }
  } 

}
