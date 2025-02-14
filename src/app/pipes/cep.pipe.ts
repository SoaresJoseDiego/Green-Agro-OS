import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
  standalone: true
})
export class CepPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return '';

    let cleaned = value.toString().replace(/\D/g, '');

    if (cleaned.length !== 8) return value.toString();

    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

}
