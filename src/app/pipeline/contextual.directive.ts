import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[contextalizable]'
})
export class ContextualDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
 