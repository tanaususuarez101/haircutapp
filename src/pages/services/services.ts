import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TodoProvider} from "../../providers/todo/todo";
import {ReservationPage} from "../reservation/reservation";

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  serviceAvailable: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todo: TodoProvider) {
  }

  ionViewDidLoad() {
    this.todo.getAvailableServices().subscribe(data => {
      this.serviceAvailable = data;
      //console.log(this.serviceAvailable);
    });
  }

  goDoReservation(service){
    this.navCtrl.push(ReservationPage,{
      "service":service
    });
  }

}
