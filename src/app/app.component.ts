import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {ServicesPage} from "../pages/services/services";
import {MyServicesPage} from "../pages/my-services/my-services";
import {LoginPage} from "../pages/login/login";
import {TodoProvider} from "../providers/todo/todo";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage:any = ServicesPage;
  rootPage:any = LoginPage;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public todo:TodoProvider) {
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

  goServices(){
    this.nav.setRoot(ServicesPage);
  }
  goMyServices(){
    this.nav.setRoot(MyServicesPage);
  }

  logout() {
    this.todo.closeSession()
      .then(()=> {
        console.log("Has salido satisfactoriamente");
      })
      .catch(err =>{
        console.log("Ha habido un error al salir");
      });

    this.nav.setRoot(LoginPage);
  }
}

