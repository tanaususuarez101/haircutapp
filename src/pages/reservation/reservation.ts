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
  listEmployees: any = [];
  employees: any = null;
  date: any = null;
  hour: any = null;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public todo: TodoProvider) {}

  ionViewDidLoad() {

    this.typeService = this.navParams.get('service');
    if (this.typeService.employees_name != null) this.employees = this.typeService.employees_name;
    if (this.typeService.time != null) this.date = this.typeService.time;
    if (this.typeService.hour != null) this.hour = this.typeService.hour;
    this.todo.getEmployees().subscribe(data =>this.listEmployees = data);
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

    if (this.typeService.id == null){
      if (this.date != null && this.hour != null && this.employees != null){
        this.todo.saveReservation({
          date: this.date,
          hour: this.hour,
          employees_name: this.employees,
          service_name: this.typeService.service_name,
          service_price: this.typeService.price,
          service_duration: this.typeService.duration
        });
        this.navCtrl.setRoot(MyServicesPage);

      } else {
        console.log( 'Falta algun dato' );
      }
    } else {
      this.todo.updateReservation(
        {
          id: this.typeService.id,
          date: this.date,
          hour: this.hour,
          employees_name: this.employees,
          service_name: this.typeService.service_name,
          service_price: this.typeService.price,
          service_duration: this.typeService.duration
      });
      this.navCtrl.pop();

    }
  }
}
