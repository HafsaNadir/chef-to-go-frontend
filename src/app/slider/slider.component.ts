import { Component, OnInit,Input } from '@angular/core';
import * as jQuery from 'jquery';
import * as AOS from 'aos';
import { CategoryService } from "../core/services/category.service";
import { Subscription } from 'rxjs';
import { environment } from './../../environments/environment';


declare var $: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  subscriptions: Subscription[] = [];
  category : [];
  imgageUrl: string = null;

  exampleData = ["aaaa","bbbbb"]
  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategory();
    this.imgageUrl = environment.imageBase;

    this.subscriptions[0] = this.categoryService.categoryData$.subscribe(data => {
      if (data && data.length > 0) {
        this.category = data;
        setTimeout(() => {
          $('.slider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            dots:false,		
                arrows: true,	
              focusOnSelect: false,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2,        
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]
          });
             $(".slider").removeClass("loading"); 
        }, 1000);
      }
    });  

  }

  ngOnInit(){
    if (typeof jQuery != 'undefined') {
        // jQuery is loaded => print the version
  //   alert(jQuery.fn.jquery);
    }else{
        // jQuery was not loaded
        console.error("No jquery");
    }

    var counter_switch = 0;
    var animated = 0;
    
    AOS.init({
      once: true, 
    });

    $(document).ready(function(){
          
    });

}

}
