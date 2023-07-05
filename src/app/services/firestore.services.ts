import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  storeOTP(otpData: DocumentData): Promise<DocumentReference<DocumentData>> {
    const collectionRef = this.firestore.collection<DocumentData>('otp');
    return collectionRef.add(otpData);
  }

  verifyOTP(otpData: any): Observable<boolean> {
    return this.firestore
      .collection('otp', (ref) => ref.where('otp', '==', otpData.otp))
      .valueChanges()
      .pipe(
        map((data: any[]) => {
          return data.length > 0;
        })
      );
  }
}
