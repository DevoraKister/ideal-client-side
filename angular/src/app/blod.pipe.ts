import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blod'
})
export class BlodPipe implements PipeTransform {

  transform(text: string, search: string, patter): string {
    if (!text || !search) {
      return text;
    }

    // allow searching against any word
    const searchRegex = search
      .split(' ')
      .map(this.escapeRegExp)
      .map(x => `(\\s|^)${x}`)
      .join('|');
    
    const regex = new RegExp(searchRegex, 'gi');
    const bolded = text.replace(regex, match => `</b>${match}<b>`);
  
    return `<b>${bolded}</b>`;
  }

   escapeRegExp(val: string): string {
    return val.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
}
