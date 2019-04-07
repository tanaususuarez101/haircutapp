import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { CalendarModule } from "ion2-calendar";
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { TodoProvider } from '../providers/todo/todo';
import {ServicesPage} from "../pages/services/services";
import {MyServicesPage} from "../pages/my-services/my-services";
import {ReservationPage} from "../pages/reservation/reservation";
import {ServiceDetailsPage} from "../pages/service-details/service-details";
import {PipesModule} from "../pipes/pipes.module";
import {LoginPage} from "../pages/login/login";
import {ProfilePage} from "../pages/profile/profile";
import {HomePage} from "../pages/home/home";



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
    ReservationPage,
    ServiceDetailsPage,
    LoginPage,
    ProfilePage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CalendarModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ServicesPage,
    MyServicesPage,
    ReservationPage,
    ServiceDetailsPage,
    LoginPage,
    ProfilePage,
    HomePage
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
