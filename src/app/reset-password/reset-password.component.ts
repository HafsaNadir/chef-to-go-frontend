import { NotificationService } from './../core/notification.service';
import { ResetPasswordService } from './../core/services/reset-password.service';
import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: string = ""
  cpassword: string = ""
  subscriptions: Subscription[] = []
  message: string = ""

  constructor(private resetPassService: ResetPasswordService,
    private notifyService: NotificationService, private router: Router,
    private activatedRoute: ActivatedRoute) {

  }


  resetHighlight() {

    let elem = document.getElementsByClassName("form-c");
    //elem.style = "color:red; border: 1px solid red";
    jQuery('.form-c').css('border', '');
  }

  showHighlight(e) {

    let elem: HTMLElement = document.getElementById(e);
    elem.setAttribute("style", "border: 1px solid red;");
  }

  resetPassword() {
    this.resetHighlight();
    if (this.password.trim() === '') {
      this.notifyService.showWarning("password required", "Error");
      this.showHighlight('password');
      return false;
    }

    if (this.cpassword.trim() === '') {
      this.notifyService.showWarning("confirm Password required", "Error");
      this.showHighlight('cpassword');
      return false;
    }
    if (this.password.trim() !== this.cpassword.trim()) {
      this.notifyService.showWarning("Password Dont Matched", "Error");
      this.showHighlight('cpassword');

      return false;
    }
    const obj = {
      password: this.password
    }
    this.subscriptions[0] = this.activatedRoute.paramMap.subscribe(params => {
      const hash = params.get('hash');
      const id = params.get('id')
      console.log(hash, id)
      this.resetPassService.resetPassword(hash, id, obj)
        .subscribe((res) => {
          if (res['success']) {
            console.log(res)
            jQuery('.form-c').val('');
            this.message = res['data']
            this.resetHighlight()
          }

        }, (err) => {
          const errObj = err.error.error
          this.notifyService.showError(errObj, 'Error')
        }
        )
    }
    );
  }

  ngOnInit(): void {
  }

}
