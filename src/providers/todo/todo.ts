import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {

  private reservationRef: AngularFireList<any>;
  private allServices:Observable<any>;
  private userServices: Observable<any>;

  constructor( private fdb: AngularFireDatabase) {
    this.reservationRef = this.fdb.list('reservations');
  }

  getServices():Observable<any>{
    return this.fdb.object('/services').valueChanges();
  }

  getMyServices():Observable<any> {
    return this.fdb.object('/reservations').valueChanges();
  }

  getEmployees():Observable<any>{
    return this.fdb.object('/employees').valueChanges();
  }

  saveReservation(reservation){
    return this.reservationRef.push(reservation);
  }

  removeReservation(key){
    this.reservationRef.remove(key);
  }

  updateReservation(id, data){
    this.reservationRef.update(id, data);
  }



}
