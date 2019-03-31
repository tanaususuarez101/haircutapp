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

  constructor( private fdb: AngularFireDatabase) {
    this.reservationRef = this.fdb.list('reservations');
  }

  getAvailableServices():Observable<any>{
    return this.fdb.object('/services').valueChanges();
  }

  getMyServices():Observable<any> {
    return this.fdb.object('/reservations').valueChanges()
      .pipe(
        map(value => {
          return value
        })
      );
  }

  getEmployees():Observable<any>{
    return this.fdb.object('/employees').valueChanges();
  }

  saveReservation(reservation){
    this.reservationRef.push(reservation);
  }

  removeReservation(key){
    this.reservationRef.remove(key);
  }

  updateReservation(id, data){
    this.reservationRef.update(id, data);
  }



}
