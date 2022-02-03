import { CategoryService } from './../core/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../core/notification.service'
import { environment } from './../../environments/environment';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-menu-discount',
  templateUrl: './menu-discount.component.html',
  styleUrls: ['./menu-discount.component.css']
})
export class MenuDiscountComponent implements OnInit {
  subscriptions: Subscription[] = [];
  menus: any = []
  image: string = null;
  imageUrl: string = null;
  id: string = null
  discountType: any = {}

  constructor(private categoryService: CategoryService, private notifyService: NotificationService) {
    this.imageUrl = environment.imageBase;
    this.categoryService.getMenu();

    this.subscriptions[0] = this.categoryService.menuData$.subscribe(data => {
      if (data && data.length > 0) {
        this.menus = data;
        console.log('this.menus)', this.menus);
        for(let i in this.menus){
          this.discountType[i] = this.menus[i].discountType
          console.log(this.discountType)
        }
      }
    });
  }

  resetHighlight() {
    let elem = document.getElementsByClassName("form-c");
    //elem.style = "color:red; border: 1px solid red";
    jQuery('.form-control').css('border', '');

  }

  showHighlight(e) {
    let elem: HTMLElement = document.getElementById(e);
    elem.setAttribute("style", "border: 1px solid red;");
  }
  // setValue(i, value){
  //   this.menus[i].discountType = value
  //   console.log(this.menus[i])
  //   console.log(value)
  //   console.log(this.menus[i].discountType)
  // }
  addDiscountMenu(i) {
    console.log(i)
    let data = this.menus[i];
    console.log(data)
    this.id = data._id
    let regexPattern = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/i

    if (data.isDiscount && !this.discountType[i]) {
      this.notifyService.showWarning("please select an option", "Error");
      return false;
    }
    if (data.isDiscount && this.discountType[i] && !data.discountValue) {
      this.notifyService.showWarning("please enter percent/amount", "Error");
  //    this.showHighlight('discountValue');
      return false;
    }
    if (data.isDiscount && this.discountType[i] === "percentage" && !regexPattern.test(data.discountValue)) {
      this.notifyService.showWarning("please enter a valid percentage", "Error");
  //    this.showHighlight('discountValue');
      return false; 
    }
    const obj = {
      isDiscount: data.isDiscount,
      discountType: this.discountType[i],
      discountValue: data.discountValue,
    }
    this.categoryService.addDiscountMenu(obj, this.id)
      .subscribe(res => {
        console.log(res);
        this.categoryService.getMenu();
        this.notifyService.showSuccess('Saved Successfully', 'Success')
      },
        (err) => {
          console.error('err', err.error.error);
          this.notifyService.showWarning(err.error.error, 'Error');
        })
  }

  ngOnInit(): void {
  }

}
