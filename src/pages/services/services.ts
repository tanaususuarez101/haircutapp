import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
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
              public todo: TodoProvider,
              public loadingController: LoadingController) {
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
            loader.dismiss();
          },
          err => loader.dismiss()
      )}
    );
  }

  goDoReservation(item){
    this.navCtrl.push(ReservationPage,{"service":item});
  }


}
