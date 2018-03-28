import { Directive, HostListener, ElementRef,Output,EventEmitter } from '@angular/core';

@Directive({
  selector: 'svg:rect[pipeline-directive]'
})
export class PipelineDirective {
  moving = false;
  lastX = 0;
  lastY = 0;
  @Output() movEmit = new EventEmitter<number[]>();
  
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
    if (event.target == this.el.nativeElement && event.deltaY != 0 && event.which  === 1) {
      //let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      //console.log(- 1/40 *event.deltaY)
      //this.zoom.emit(- 1/40 *event.deltaY);
    }
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
    if (event.target == this.el.nativeElement &&this.moving) {
      this.moving = false;
    }
  }
  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    if (event.target == this.el.nativeElement && !this.moving) {
      this.moving = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
    }
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    if (event.target == this.el.nativeElement && this.moving) {
      this.moving = false;
    }
  }
  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    if (event.target == this.el.nativeElement && this.moving) {
      this.moveElement(event.clientX, event.clientY)
    }

  }
  private moveElement(x: number, y: number) {
    this.movEmit.emit([x-this.lastX,y-this.lastY])
    this.lastX = x;
    this.lastY = y;
  }
}
