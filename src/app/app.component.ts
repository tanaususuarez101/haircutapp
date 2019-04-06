import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {LoginPage} from "../pages/login/login";
import {TodoProvider} from "../providers/todo/todo";
import {ProfilePage} from "../pages/profile/profile";
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public todo: TodoProvider,
              public toastCtrl: ToastController) {
   this.initializeApp();
  }


  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goHome() {
    this.nav.setRoot(HomePage);
  }

  goMyProfile() {
    this.nav.setRoot(ProfilePage);
  }

  logout() {
    this.todo.closeSession()
      .then(()=> {
        const toast = this.toastCtrl.create({
          message: 'Has salido satisfactoriamente',
          duration: 3000
        });
        toast.present();
        this.nav.setRoot(LoginPage);
      })
      .catch(err =>{
        console.log("Ha habido un error al salir");
      });
  }

}

