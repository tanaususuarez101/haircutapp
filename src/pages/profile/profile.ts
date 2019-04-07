import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TodoProvider} from "../../providers/todo/todo";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todo: TodoProvider,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.user = this.todo.getSession();
    if (!this.user) this.navCtrl.setRoot(LoginPage);
  }

}
