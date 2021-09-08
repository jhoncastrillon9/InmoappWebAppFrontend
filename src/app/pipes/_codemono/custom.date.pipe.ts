import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
   
@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    //console.log(value);    
    if (value == null || value == undefined)
      return ''

    const DELIMITER = '/';
    const year = value.substring(0, 4);
    const mouth = value.substring(5, 7);
    const day = value.substring(8, 10);

    const outDate = `${day}${DELIMITER}${mouth}${DELIMITER}${year}`;

    return outDate;
  }
}