import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'money' })
export class MoneyPipe implements PipeTransform {
  transform(value: string) {
    let exponentRegExp = /(\.\d+)$/i;
    let exponent = exponentRegExp.test(value) ? value.match(exponentRegExp)[1] : '';
    let valueSignRegExp = /^(\-)/i;
    let isNegative = valueSignRegExp.test(value);
    return (isNegative ? '‒ ' : '') + value
      .replace(exponentRegExp, '')
      .replace(valueSignRegExp, '')
      .split('')
      .reverse()
      .map((symbol, index) => {
        return index && !(index % 3) ? symbol + ' ' : symbol;
      })
      .reverse()
      .join('') + exponent;
  }
}