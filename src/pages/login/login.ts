import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ServicesPage} from "../services/services";
import {TodoProvider} from "../../providers/todo/todo";

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
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }



  signin() {
    if (this.user.email=="" || this.user.password=="" ) return;

    this.todo.registerUser(this.user)
      .then((user) => {
        console.log("Usuario registrado");
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
    this.todo.loginUser(this.user)
      .then(()=>{
        console.log("Login realizado");
        this.navCtrl.setRoot(ServicesPage);
      })
      .catch(err=> {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })
  }
}
