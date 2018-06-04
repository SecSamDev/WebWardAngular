import { Pipe, PipeTransform } from '@angular/core';
import {CATEGORIES} from './wappalyzer'
@Pipe({
  name: 'wappacat'
})
export class WappaCatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var aux = CATEGORIES[value];
    if(aux.name){
      return aux.name
    }else{
      return value;
    }
  }

}
