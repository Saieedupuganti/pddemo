import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage {
  otpCode: number = 0; // Initialize with a default value
  errorMessage: string = ''; // Holds the error message

  constructor(private router: Router) {}

  verifyOTP() {
    // Implement your OTP verification logic here
    // For example, you can compare the entered OTP with the expected OTP
    // If the OTP is valid, you can navigate to the next page
    if (this.otpCode === 123456) {
      this.router.navigate(['/success']);
    } else {
      // Handle invalid OTP, show error message, etc.
      this.errorMessage = 'Invalid OTP';
    }
  }
}
