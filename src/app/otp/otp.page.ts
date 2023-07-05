import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.services';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage {
  otpCode: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}

  verifyOTP() {
    const otpData = {
      otp: this.otpCode,
      recipientName: '', // Provide the recipient name if needed
      toEmail: '', // Provide the email address if needed
    };

    this.firestoreService.verifyOTP(otpData).subscribe((isValid: boolean) => {
      if (isValid) {
        this.router.navigate(['/success']);
      } else {
        this.errorMessage = 'Invalid OTP';
      }
    });
  }
}
