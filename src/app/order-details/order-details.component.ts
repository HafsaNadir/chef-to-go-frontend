import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AOS.init({
      once: true, 
    });
}

}
