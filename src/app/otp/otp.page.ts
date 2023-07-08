// otp.page.ts
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.services';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

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
      this.userEmail = state?.['email'] || '';
    });
  }

  verifyOTP() {
    const otpData = {
      otp: this.otpCode,
      toEmail: this.userEmail,
    };
    
    this.firestoreService.verifyOTP(otpData).subscribe((isValid: boolean) => {
      if (isValid) {
        this.router.navigate(['/success']);
      } else {
        this.errorMessage = 'Invalid OTP';
      }
    });
  }

  resendOTP() {
    const newOTP = this.generateOTP();
    const otpData = {
      otp: newOTP,
      toEmail: this.userEmail,
    };

    this.firestoreService.storeOTP(otpData)
      .then(() => {
        emailjs.send('service_o56917j', 'template_7e60w9q', {
          to_email: this.userEmail,
          message: `Your new OTP is: ${newOTP}`
        }, 'y4S-GgPR27hmrNsQV')
          .then((response: EmailJSResponseStatus) => {
            console.log('Email sent:', response.status, response.text);
          })
          .catch((error: any) => {
            console.error('Error sending email:', error);
          });
      })
      .catch((error: any) => {
        console.error('Error resending OTP:', error);
      });
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
