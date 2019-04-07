import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {

  private reservationRef: AngularFireList<any>;
  private sessionUser: any = null;

  constructor( private fdb: AngularFireDatabase,
               private afAuth: AngularFireAuth,
               private storage: Storage) {

    this.reservationRef = this.fdb.list('reservations');

    /*
     * TODO - Verificar mediante token si la sesión sigue siendo válida.
    * */
    //this.sessionUser = JSON.parse(localStorage.getItem("sesion"));


  }

  initSesion () {
    return this.storage.get("sesion").then((value)=>{
      this.sessionUser = JSON.parse(value);
    });
  }

  getServices():Observable<any>{
    return this.fdb.object('/services').valueChanges();
  }

  getMyServices():Observable<any> {
    return this.fdb.object('/reservations')
      .snapshotChanges()
      .pipe(
        map ( data => {
          return _.map(data.payload.val(), (value, id)=> (
            {
              id: id,
              uid: value.uid,
              date: value.date,
              hour: value.hour,
              employees_name: value.employees_name,
              service_duration: value.service_duration,
              service_name: value.service_name,
              service_price: value.service_price,

            }
          )).filter( value => value.uid == this.sessionUser.uid);

        })
      );
  }

  getEmployees():Observable<any>{
    return this.fdb.object('/employees').valueChanges();
  }

  saveReservation(reservation){
    return this.reservationRef.push(reservation);
  }

  removeReservation(key){
    return this.reservationRef.remove(key);
  }

  updateReservation(id, data){
    return this.reservationRef.update(id, data);
  }

  registerUser(user){
    return this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password);
  }

  loginUser(user){
    return this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((sesion)=> {
        if (typeof(Storage) !== "undefined") {
          //localStorage.setItem("sesion", JSON.stringify(sesion.user));
          this.storage.set("sesion", JSON.stringify(sesion.user));
        }
        this.sessionUser = sesion.user;
      });
  }

  closeSession(){
    //localStorage.removeItem("sesion");
    this.storage.remove("sesion")
      .then((value) => console.log("sesion borrada",value));
    this.sessionUser = null;
    return this.afAuth.auth.signOut();
  }

  getSession(){
    return this.sessionUser;
  }

}
