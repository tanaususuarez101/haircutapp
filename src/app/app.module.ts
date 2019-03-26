import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuthModule} from '@angular/fire/auth';

import { MyApp } from './app.component';
import { TodoProvider } from '../providers/todo/todo';
import {ServicesPage} from "../pages/services/services";
import {MyServicesPage} from "../pages/my-services/my-services";
import {ReservationPage} from "../pages/reservation/reservation";


const firebaseConfig = {
  apiKey: "AIzaSyC-JtQBN7XXhOXmk2oiBh3le8y08Sqtpdg",
  authDomain: "haircutapp-daw2.firebaseapp.com",
  databaseURL: "https://haircutapp-daw2.firebaseio.com",
  projectId: "haircutapp-daw2",
  storageBucket: "haircutapp-daw2.appspot.com",
  messagingSenderId: "470760084023"
};

@NgModule({
  declarations: [
    MyApp,
    ServicesPage,
    MyServicesPage,
    ReservationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ServicesPage,
    MyServicesPage,
    ReservationPage
  ],
  providers: [
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoProvider
  ]
})
export class AppModule {}
