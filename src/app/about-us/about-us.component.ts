import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AOS.init({
      once: true, 
    });
}

}
