import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import { CalendarModal, CalendarResult } from "ion2-calendar";
import {TodoProvider} from "../../providers/todo/todo";

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
  employees: any;
  date: any;
  hour: any;
  uid: any = null;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public todo: TodoProvider,
              public alertCtrl: AlertController
              ) {}

  ionViewDidLoad() {
    this.todo.getEmployees().subscribe(data => this.listEmployees = data);
    this.typeService = this.navParams.get('service');

    this.uid = this.todo.getSession().uid;
    this.employees = !(this.typeService.employees_name == null)? this.typeService.employees_name: null;
    this.date = !(this.typeService.date == null)? this.typeService.date: null;
    this.hour = !(this.typeService.hour == null)? this.typeService.hour: null;

  }

  openCalendar() {
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: {
        title: 'Calendario',
        disableWeeks: [0, 6],
        pickMode: "single",
        autoDone: true
      }
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: String) => {
      this.date = date;
    })
  }


  doReserve() {

    if (this.date == null || this.hour == null || this.employees == null){
      let alert = this.alertCtrl.create({
        title: '¡Faltan campos!',
        subTitle: 'Por favor, rellene todos los campos antes de confirmar su servicio',
        buttons: ['¡Ups, lo siento!']
      });
      alert.present();
      return;
    }

    let data = {
      date: this.date,
      hour: this.hour,
      employees_name: this.employees,
      service_name: this.typeService.service_name,
      service_price: this.typeService.price,
      service_duration: this.typeService.duration,
      uid: this.uid
    };

    if (this.typeService.id == null){
      this.todo.saveReservation(data);
      this.navCtrl.pop();
    }
    else {
      this.todo.updateReservation(this.typeService.id, data);
      this.navCtrl.pop();
    }



  }

}
