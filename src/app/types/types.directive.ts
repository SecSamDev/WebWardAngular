import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[node-types]'
})
export class TypesDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
