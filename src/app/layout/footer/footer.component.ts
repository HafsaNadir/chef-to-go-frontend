import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

declare var $: any;


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  
  ngOnInit() {


    $(window).scroll(function() {
      scrollTop();
    });
    
    function scrollTop(){
      if($(window).scrollTop() > 700){		
        $('.back-to-top').fadeIn();
      }
      else{
        $('.back-to-top').fadeOut();
      }
    
    
      if($(window).scrollTop() > 200){		
        $('header').addClass('fixed');
      }
      else{
        $('header').removeClass('fixed');
      }	
    }
    
    function hashScroll(){
        var hash = window.location.hash ;
        if(hash != ''){
        var padding = $('header').outerHeight()+130;
        $(hash).animatescroll({scrollSpeed:100,hash,padding:padding});
        window.location.hash = hash;
      }    
    }   

    $('.back-to-top').on('click',function(){   
      $('html,body').stop().animate({
        scrollTop: '0px',
      });
    });
     

  }

}
