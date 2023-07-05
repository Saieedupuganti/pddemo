import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  storeOTP(otpData: any): Promise<DocumentReference> {
    const collectionRef = this.firestore.collection('otp');
    return collectionRef.add(otpData);
  }
}
