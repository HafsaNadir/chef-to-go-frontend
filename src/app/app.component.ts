import { Component } from '@angular/core';
import { Router, NavigationEnd , ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import * as jQuery from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  routerUr: string;
  subscriptions: Subscription[] = [];

  constructor(private router: Router, private rt : ActivatedRoute) {
    //this.routerUr = this.rt.url; 
    }
  ngOnInit(){


    this.router.events.subscribe((evt) => {
       this.routerUr = this.router.url;

      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });    
    if (typeof jQuery != 'undefined') {
        // jQuery is loaded => print the version
    // alert(jQuery.fn.jquery);
    }else{
        // jQuery was not loaded
    }

}

}