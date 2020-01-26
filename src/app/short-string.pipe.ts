import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortString'
})
export class ShortStringPipe implements PipeTransform {

  transform(str:string,len:number): any {
    let newStr=str.substr(0,len);
    if(str.length>len)
    newStr+='...';
    
    return newStr;
  }

}
