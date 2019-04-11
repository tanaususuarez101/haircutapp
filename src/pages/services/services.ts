import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
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
  prevServicies: any = [];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todo: TodoProvider,
              public loadingController: LoadingController,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.initializeItems();
  }

  initializeItems(){
    let loader = this.loadingController.create({
      content: 'Accediendo a los datos ...',
    });
    loader.present()
      .then(()=>{
        this.todo.getServices().subscribe(
          data => {
            this.serviceAvailable = data;
            this.prevServicies = data;
            loader.dismiss();
          }
        )
      })
      .catch(err =>{
        console.log("Error al cargar los servicios");
        loader.dismiss();
      });
  }

  goDoReservation(item){
    this.navCtrl.push(ReservationPage,{"service":item});
  }

  getItems(ev) {


    var val = ev.target.value;
    this.serviceAvailable = this.prevServicies;

    this.serviceAvailable = this.serviceAvailable.map(
      data => {
        return {
          group_name: data.group_name,
          group_service : data.group_service.filter(
            value => value.service_name.toLowerCase().indexOf(val.toLowerCase()) > -1
          )
        }
      }
    );
  }
}
