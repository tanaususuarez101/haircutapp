import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {
  CalendarComponentOptions,
  CalendarComponentPayloadTypes,
  CalendarModal,
  CalendarModalOptions, CalendarResult
} from "ion2-calendar";

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

  typeService:any;
  date: any;
  employees: any;

  listEmployees: any = [
    {"id": 1, "name":"Juan"},
    {"id": 2, "name":"Pepe"},
    {"id": 3, "name":"Pepeito grillo"}
  ];
  hour: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('service'));
    this.typeService = this.navParams.get('service');

  }


  onChange($event: CalendarComponentPayloadTypes) {
//    console.log("date =>", this.date);
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

    myCalendar.onDidDismiss((date: CalendarResult, type: 'backdrop') => {
      console.log("Date => ",date);
      console.log("Peluquero =>", this.employees);
      this.date = date;
    })
  }

  doReserve() {
    console.log("datos de la reserva",{
      time:this.date.time,
      services_id:  this.typeService.id
    });
  }
}
