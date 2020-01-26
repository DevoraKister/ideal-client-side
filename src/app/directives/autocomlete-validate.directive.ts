import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appAutocomleteValidate]',
  providers: [{provide: NG_VALIDATORS, useExisting: AutocomleteValidateDirective, multi: true}]
})
export class AutocomleteValidateDirective implements Validator{
  @Input('appAutocomleteValidate') authorizedArr: any[];
  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    
    return this.authorizedArr&& this.authorizedArr.find(f=>f==control.value)?null:{notExist:true};
  }

}
