import { NotificationService } from './../core/notification.service';
import { RegistrationService } from './../core/services/registration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent implements OnInit {

  constructor(private registrationService: RegistrationService, private notifyService: NotificationService) { }

  ngOnInit(): void {
  }
  
  resendEmail(){
    let refId = localStorage.getItem('refId')
    if (refId == null) {
      this.notifyService.showError("An unknown error has occurred. Please try again.", "Error");
    }
    this.registrationService.resendEmail(refId)
  }

}
