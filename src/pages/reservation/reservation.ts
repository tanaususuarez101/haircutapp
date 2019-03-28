import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import {TodoProvider} from "../../providers/todo/todo";
import {MyServicesPage} from "../my-services/my-services";

/**
 * Generated class for the ReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {

  typeService:any = null;
  employees: any = null;
  listEmployees: any = [];
  date: any = null;
  hour: any = null;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public todo: TodoProvider) {
  }
  ionViewDidLoad() {
    console.log(this.navParams.get('service'));
    this.typeService = this.navParams.get('service');
    this.todo.getEmployees().subscribe(data => this.listEmployees = data);
  }

  openCalendar() {
    const options: CalendarModalOptions = {
      title: 'Calendario',
      disableWeeks: [0, 6],
      pickMode:"single",
      autoDone: true
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: String) => {
      this.date = date;
    })
  }

  doReserve() {

    if (this.date != null && this.hour != null && this.employees != null){

      this.todo.saveReservation({
        time: this.date.time,
        hour: this.hour,
        employees_name: this.employees,
        services_id:  this.typeService.id,
        service_name: this.typeService.service_name,
        service_price: this.typeService.price,
        service_duration: this.typeService.duration
      });
      this.navCtrl.setRoot(MyServicesPage);

    } else {
      console.log( 'Falta algun dato' );
    }
  }
}
