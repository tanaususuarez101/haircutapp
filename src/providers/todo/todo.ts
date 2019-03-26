import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {



  constructor( private fdb: AngularFireDatabase) {}

  getAvailableServices():Observable<any>{
    return this.fdb.object('/services').valueChanges();
  }


  getMyServices():Observable<any> {
    return this.fdb.object('/reservations').valueChanges();
  }


}
