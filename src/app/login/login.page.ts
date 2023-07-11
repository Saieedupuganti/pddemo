import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FirestoreService } from '../services/firestore.services';
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class loginPage {
  recipientName = 'John Doe';
  userEmail: string = '';
  items: any[] = [];

  constructor(
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const emailParams = {
      to_name: this.recipientName,
      message: `Your OTP is: ${otp}`,
      to_email: this.userEmail,
    };
    console.log(otp);
    // emailjs
    //   .send('service_o56917j', 'template_7e60w9q', emailParams, 'y4S-GgPR27hmrNsQV')
    //   .then((response: emailjs.EmailJSResponseStatus) => {
    //     if (response.status === 200) {
    //       console.log('Email sent successfully!', response);

    //       const otpData = {
    //         otp: otp.toString(), 
    //         recipientName: this.recipientName,
    //         toEmail: this.userEmail,
    //       };

    //       this.firestoreService
    //         .storeOTP(otpData)
    //         .then(() => {
    //           console.log('OTP stored in the database successfully');
    //           console.log(this.userEmail);
    //           this.router.navigate(['/otp'], { state: { email: this.userEmail } });
    //         })
    //         .catch((error: any) => {
    //           console.error('Error storing OTP in the database:', error);
    //         });
    //     } else {
    //       console.error('Error sending email:', response);
    //     }
    //   })
    //   .catch((error: any) => {
    //     console.error('Error sending email:', error);
    //   });

    const otpData = {
      otp: otp.toString(), 
      recipientName: this.recipientName,
      toEmail: this.userEmail,
    };

    this.firestoreService
      .storeOTP(otpData)
      .then(() => {
        console.log('OTP stored in the database successfully');
        console.log(this.userEmail);
        const navigationExtras: NavigationExtras = {
          state: { email: this.userEmail } 
        };
        this.router.navigate(['/otp'], navigationExtras);
      })
      .catch((error: any) => {
        console.error('Error storing OTP in the database:', error);
      });
  }
}