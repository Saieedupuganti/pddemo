// otp page 
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.services';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage {
  otpCode: string = '';
  errorMessage: string = '';
  userEmail: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {
    this.route.queryParams.subscribe(params => {
      const state = this.router.getCurrentNavigation()?.extras?.state;
      this.userEmail = state && state['email'] ? state['email'] : '';
    });
  }

  verifyOTP() {
    const otpData = {
      otp: this.otpCode,
      toEmail: this.userEmail,
    };
    console.log(otpData.otp);
    console.log(otpData.toEmail);
    
    this.firestoreService.verifyOTP(otpData).subscribe((isValid: boolean) => {
      if (isValid) {
        this.router.navigate(['/success']);
      } else {
        this.errorMessage = 'Invalid OTP';
      }
    });
  }
}
