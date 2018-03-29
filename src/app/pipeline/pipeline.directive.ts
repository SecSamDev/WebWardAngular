import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import {HosePipeService} from './hose-pipe.service'
/**
 * This directive allow us to move the svg canvas, do zoom using the mouse wheel.
 * For zoom use "shift + wheel".
 * For movement only click inside the canvas.
 */
@Directive({
  selector: 'svg:rect[pipeline-directive]'
})
export class PipelineDirective {
  moving = false;
  lastX = 0;
  lastY = 0;
  @Output() zoom = new EventEmitter<number>();
  @Output() movEmit = new EventEmitter<number[]>();
  @Output() mouseEvnt = new EventEmitter<any>();
  constructor(private el: ElementRef, private hosePipeService  :HosePipeService) {

  }
  @HostListener('wheel', ['$event']) onMouseWheel(event: any) {
    this.mouseWheelFunc(event);
  }
  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }
  private mouseWheelFunc(event) {
    if (event.target == this.el.nativeElement && event.deltaY != 0 && event.shiftKey) {
      let delta = event.deltaY;//Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      if (delta && (delta > -1 || delta < 1))
        this.zoom.emit(1 / 40 * event.deltaY);
    }
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
    if (event.target == this.el.nativeElement && this.moving) {
      this.moving = false;
      this.mouseEvnt.emit({evnt : 'mouseleave',x : event.clientX, y: event.clientY})
      this.hosePipeService.clean();
    }
  }
  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    if (event.target == this.el.nativeElement && !this.moving) {
      this.moving = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
      this.mouseEvnt.emit({evnt : 'mousedown',x : event.clientX, y: event.clientY})
      this.hosePipeService.clean();
    }
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    if (event.target == this.el.nativeElement && this.moving) {
      this.moving = false;
      this.mouseEvnt.emit({evnt : 'mouseup',x : event.clientX, y: event.clientY})
      this.hosePipeService.clean();
    }
  }
  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    if (event.target == this.el.nativeElement && this.moving) {
      this.moveElement(event.clientX, event.clientY)
      this.hosePipeService.clean();
    } else if (!this.moving) {//Not moving the canvas
      this.mouseEvnt.emit({evnt : 'mousemove',x : event.clientX, y: event.clientY})
    }
 
  }
  private moveElement(x: number, y: number) {
    this.movEmit.emit([x - this.lastX, y - this.lastY])
    this.lastX = x;
    this.lastY = y;
  }
}
 