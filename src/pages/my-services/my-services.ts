import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
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
              public todo: TodoProvider,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {

    this.todo.getMyServices().subscribe(

      data =>{
        this.reservation = _.map(data, (value, id) => (
          {
            id: id,
            employees_name: value.employees_name,
            hour: value.hour,
            service_duration: value.service_duration,
            service_name: value.service_name,
            service_price: value.service_price,
            services_id: value.services_id,
            date: value.date
          }));
      }
    )
  }


  viewDetails(data) {

    let modal = this.modalCtrl.create(ServiceDetailsPage, {'item':data});
    modal.present();
  }
}
