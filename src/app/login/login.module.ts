import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginPageRoutingModule } from './login-routing.module';
import { loginPage } from './login.page';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../services/firestore.services';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@NgModule({
  declarations: [loginPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LoginPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [FirestoreService],
  bootstrap: [loginPage]
})
export class LoginPageModule  {}
