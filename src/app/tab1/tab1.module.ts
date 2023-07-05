import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { Tab1Page } from './tab1.page';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../services/firestore.services';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@NgModule({
  declarations: [Tab1Page],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    Tab1PageRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [FirestoreService],
  bootstrap: [Tab1Page]
})
export class Tab1PageModule {}
