import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  storeOTP(otpData: any): Promise<any> {
    const timestamp = new Date().getTime(); 
    const otpDataWithTimestamp = { ...otpData, timestamp }; 
    const collectionRef = this.firestore.collection<any>('otp');
    return collectionRef.add(otpDataWithTimestamp);
  }

  verifyOTP(otpData: any): Observable<boolean> {
    console.log(otpData);
    console.log(otpData.otp);
    console.log(otpData.toEmail);
  
    return this.firestore
      .collection('otp', (ref) => ref.where('toEmail', '==', otpData.toEmail).orderBy('timestamp', 'desc'))
      .valueChanges()
      .pipe(
        map((data: any[]) => {
          if (data && data.length > 0) {
            const latestOTP = data[0].otp.toString();
            console.log('Latest OTP:', latestOTP);
            console.log(otpData.otp);
            console.log(otpData.toEmail);
            return latestOTP === otpData.otp.toString();
          }
          return false;
        })
      );
  }
}
