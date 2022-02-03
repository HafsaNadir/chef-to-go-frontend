import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import * as AOS from 'aos';
declare var $: any;

@Component({
  selector: 'app-restruant-detail-unavailable',
  templateUrl: './restruant-detail-unavailable.component.html',
  styleUrls: ['./restruant-detail-unavailable.component.css']
})
export class RestruantDetailUnavailableComponent implements OnInit {

  constructor() { }

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

  }
}
