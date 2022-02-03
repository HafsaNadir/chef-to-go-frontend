import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../core/notification.service';
import { RegistrationService } from './../core/services/registration.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-activation',
  templateUrl: './email-activation.component.html',
  styleUrls: ['./email-activation.component.css']
})
export class EmailActivationComponent implements OnInit {
  
  subscriptions: Subscription[] = []
  message: string = ""
  constructor(private notifyService: NotificationService,
    private registrationService: RegistrationService, private activatedRoute: ActivatedRoute) { 
      this.subscriptions[0] = this.activatedRoute.paramMap.subscribe(params => { 
        const hash = params.get('hash'); 
        const id = params.get('id')
        console.log(hash,id)
        registrationService.verifyEmail(hash, id).subscribe(
          (res) => {
            this.message = res['error']
          } ,
            (err) => {
              const errObj = err.error.error
              this.notifyService.showError(errObj,'Error')
            }
        )
        }
      );
      
  }

  ngOnInit(): void {
  }

}
