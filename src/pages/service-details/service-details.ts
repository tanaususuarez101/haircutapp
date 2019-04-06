import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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
              public todo: TodoProvider,
              public alertCtrl: AlertController) {}



  ionViewDidLoad() {
    this.service = this.navParams.get('item');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  cancelServicie(id) {
    let confirmationRemove = this.alertCtrl.create({
      title: 'Eliminar cita',
      message: '¿Seguro que quieres borrar esta cita?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.dismiss();
            this.todo.removeReservation(id);
          }
        }
      ]
    });
    confirmationRemove.present();

  }

  updateServicie() {
    this.navCtrl.pop();
    this.navCtrl.push(ReservationPage, {
      'service':{
        id: this.service.id,
        hour: this.service.hour,
        date: this.service.date,
        price: this.service.service_price,
        duration: this.service.service_duration,
        employees_name: this.service.employees_name,
        service_name: this.service.service_name
      }});
  }
}
