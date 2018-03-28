import { Directive, HostListener, ElementRef,Output,EventEmitter } from '@angular/core';

@Directive({
  selector: 'svg[pipeline-directive]'
})
export class PipelineDirective {
  currentMatrix = [];
  @Output() zoom = new EventEmitter<number>();
  constructor(private el: ElementRef) {

  }
  @HostListener('wheel', ['$event']) onMouseWheel(event: any) {
    this.mouseWheelFunc(event);
  }/*
  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }*/
  private mouseWheelFunc(event) {
    throw new Error("Correct my code")
    if (event.target == this.el.nativeElement && event.deltaY != 0 && event.which  === 1) {
      //let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      console.log(- 1/40 *event.deltaY)
      this.zoom.emit(- 1/40 *event.deltaY);
    }
  }
}
