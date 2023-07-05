import { Component } from '@angular/core';
import * as emailjs from 'emailjs-com';
import { NavController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.services';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  recipientName = 'John Doe';
  userEmail: string = '';

  constructor(private navCtrl: NavController, private firestoreService: FirestoreService) {}

  generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const emailParams = {
      to_name: this.recipientName,
      message: `Your OTP is: ${otp}`,
      to_email: this.userEmail
    };

    emailjs.send('service_o56917j', 'template_7e60w9q', emailParams, 'y4S-GgPR27hmrNsQV')
      .then((response: emailjs.EmailJSResponseStatus) => {
        console.log('Email sent successfully!', response);

        
        const otpData = {
          otp: otp,
          recipientName: this.recipientName,
          toEmail: this.userEmail
        };
        this.firestoreService.storeOTP(otpData)
          .then(() => {
            console.log('OTP stored in the database successfully');
            this.userEmail = '';
            this.navCtrl.navigateForward('/otp'); 
          })
          .catch((error: any) => {
            console.error('Error storing OTP in the database:', error);
          });
      })
      .catch((error: any) => {
        console.error('Error sending email:', error);
      });
  }
}
