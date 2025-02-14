import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPhone',
  standalone: true
})
export class NumberPhonePipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return '';

    let cleaned = value.toString().replace(/\D/g, '');

    if (cleaned.length !== 10 && cleaned.length !== 11) return value.toString();

    const ddd = cleaned.substring(0, 2);
    const isCellphone = cleaned.length === 11 && cleaned[2] === '9';

    const firstPart = isCellphone 
      ? cleaned.substring(2, 7)  
      : cleaned.substring(2, 6);
    
    const secondPart = isCellphone 
      ? cleaned.substring(7, 11) 
      : cleaned.substring(6, 10); 

    return `(${ddd}) ${firstPart}-${secondPart}`;
  }

}
