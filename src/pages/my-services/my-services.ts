import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TodoProvider} from "../../providers/todo/todo";
import * as _ from 'lodash';

/**
 * Generated class for the MyServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-services',
  templateUrl: 'my-services.html',
})
export class MyServicesPage {

  myServices: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todo: TodoProvider) {
  }

  ionViewDidLoad() {
    this.todo.getMyServices().subscribe( data =>{
      console.log(data)
    })
  }

}