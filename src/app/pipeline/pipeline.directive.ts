import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import {HosePipeService} from './hose-pipe.service'
import {PipelineMouseService} from './pipeline-mouse.service'
import { Subscription } from 'rxjs/Subscription';
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
  @Output() zoom = new EventEmitter<number>();
  @Output() movEmit = new EventEmitter<number[]>();
  @Output() mouseEvnt = new EventEmitter<any>();
  constructor(private el: ElementRef,private pipeMouseService : PipelineMouseService) {

  }
  @HostListener('wheel', ['$event']) onMouseWheel(event: any) {
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
    }
  }
  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    
    if (event.target == this.el.nativeElement) {
      let subscription : Subscription;
    let lastX = 0;
    let lastY = 0;
    subscription= this.pipeMouseService.getMouseEvents().subscribe((event)=>{
      if(event.name === "mousemove"){
        if(lastX === 0 && lastY === 0){

        }else{
          this.moveElement((event.x - lastX),(event.y - lastY));
        }
        lastX = event.x;
        lastY = event.y;
      }else if(event.name === "mouseup"){
        this.moveElement((event.x - lastX),(event.y - lastY));
        subscription.unsubscribe();
      }else if(event.name === "mouseleave"){
        subscription.unsubscribe();
      }
    })
      
    }
  }
  private moveElement(x: number, y: number) {
    if(x < 200 && y < 200){
      this.movEmit.emit([x,y]);
    }
  }
}
 