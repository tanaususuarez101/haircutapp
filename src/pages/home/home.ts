import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServicesPage} from "../services/services";
import {MyServicesPage} from "../my-services/my-services";
import {TodoProvider} from "../../providers/todo/todo";
import {LoginPage} from "../login/login";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  servicesTab: any;
  myServicesTab: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todo: TodoProvider) {

    this.servicesTab = ServicesPage;
    this.myServicesTab = MyServicesPage;
  }

  ionViewDidLoad() {
    /*
     * TODO - Comprobación mediante token
    * */
    if (!this.todo.getSession()) this.navCtrl.setRoot(LoginPage);
  }

  goHome() {
    this.navCtrl.popAll();
  }
}
