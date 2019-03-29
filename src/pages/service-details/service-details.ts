import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {TodoProvider} from "../../providers/todo/todo";
import {ReservationPage} from "../reservation/reservation";

/**
 * Generated class for the ServiceDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-details',
  templateUrl: 'service-details.html',
})
export class ServiceDetailsPage {

  service: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public todo: TodoProvider) {
  }



  ionViewDidLoad() {
    this.service = this.navParams.get('item');
    console.log(this.service);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  cancelServicie(id) {
    this.dismiss();
    this.todo.removeReservation(id);

  }

  updateServicie() {
    this.navCtrl.push(ReservationPage, {
      'service':{
        price: this.service.service_price,
        service_name: this.service.service_name,
        duration: this.service.service_duration,
        hour: this.service.hour,
        date: this.service.date,
        id: this.service.id,
        employees_name: this.service.employees_name
      }});
    this.dismiss();
  }
}
