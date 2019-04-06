import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ServicesPage} from "../services/services";
import {TodoProvider} from "../../providers/todo/todo";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  user = {email:"", password:""};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todo: TodoProvider,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let res = this.todo.getSession();
    if (res) this.navCtrl.setRoot(HomePage);
  }



  signin() {
    if (this.user.email=="" || this.user.password=="" ) return;

    this.todo.registerUser(this.user)
      .then(() => {
        const toast = this.toastCtrl.create({
          message: 'Usuario registrado',
          duration: 3000
        });
        toast.present();
      })
      .catch(err=>{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })
  }

  login() {
    console.log(this.user);
    let loader = this.loadingController.create({
      content: 'Un momento por favor...',
    });
    loader.present()
      .then(()=>{
        this.todo.loginUser(this.user)
          .then(()=> {
            this.navCtrl.setRoot(HomePage);
          })
          .catch(err=> {
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: err.message,
              buttons: ['Aceptar']
            });
            alert.present();
          })
      });
    loader.dismiss();
  }
}
