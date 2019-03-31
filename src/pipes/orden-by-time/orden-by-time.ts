import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrdenByTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'ordenByTime',
})
export class OrdenByTimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    if(!value || value.length < 2) return value;
    value.sort((a:any, b:any)=>{
      if (a.date.string > b.date.string) return 1;
      else if (a.date.string < b.date.string) return -1;
      else return 0;
    });
    return value;
  }
}
