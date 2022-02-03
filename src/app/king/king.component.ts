import { Component, OnInit,Input } from '@angular/core';
import * as jQuery from 'jquery';
import * as AOS from 'aos';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../core/services/search.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


declare var $: any;

@Component({
  selector: 'app-king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.css']
})
export class KingComponent implements OnInit {

  @Input() sai:'sai';

  exampleData = ["aaaa","bbbbb"]
  subscriptions = [];
  searchData : any;
  imageBase : string = null;
  term: string;


  constructor(private router : Router,private searchService : SearchService,private route: ActivatedRoute) {
    this.imageBase = environment.imageBase;

  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      if (params['lat'] && params['long']) {
        this.searchService.getSearch(params['lat'],params['long']);
      }
    });
    this.subscriptions[0] = this.searchService.searchData$.subscribe(data => {
      if (data && data.length > 0) {
        this.searchData = data;
        //console.log('this.searchData',this.searchData[0]);
        setTimeout(() => {
          $('#loading').removeClass('loading');
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
      
        }, 1000);
      }
    });  

    if (typeof jQuery != 'undefined') {
        // jQuery is loaded => print the version
  //   alert(jQuery.fn.jquery);
    }else{
        // jQuery was not loaded
        console.error("No jquery");
    }

    var counter_switch = 0;
    var animated = 0;
    
    $(document).ready(function(){
    

      setTimeout(function(){
        AOS.init({
          once: true, 
        });
      },1000);    

     
      $('.multiselect').each(function(){    
        var placeholder = (typeof($(this).data('multiselect-placeholder')) != 'undefined')?$(this).data('multiselect-placeholder'):'';
        var btnimage = (typeof($(this).data('multiselect-btnimage')) != 'undefined')?'<img src="'+$(this).data('multiselect-btnimage')+'"/>':'';   
        $(this).multiselect({
            columns: 1,
            placeholder: btnimage+placeholder,
        });
      });
    });
    

    /*
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
    */
    

}
 
link(name){
  let url = `./resturant-detail/${name}`;
  return this.router.navigate([url]);

}

}
