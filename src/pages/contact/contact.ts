import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TodoProvider} from "../../providers/todo/todo";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  contact = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todo: TodoProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
    if (!this.todo.getSession()) this.navCtrl.setRoot(LoginPage);
    this.todo.getInform().subscribe((data)=> this.contact = data);
  }

}
