import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TodoProvider} from "../../providers/todo/todo";
import * as _ from 'lodash';
import {ServiceDetailsPage} from "../service-details/service-details";

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

  reservation: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todo: TodoProvider) {
  }

  ionViewDidLoad() {
    //console.log(this.todo.getMyServices());
    this.todo.getMyServices().subscribe(
      data =>{
        this.reservation = _.values(data);
        console.log(this.reservation);
      }
    )
  }

  viewDetails() {
    this.navCtrl.push(ServiceDetailsPage);
  }
}
