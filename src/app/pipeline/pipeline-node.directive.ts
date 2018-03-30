import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { PipelineNode } from './node';
import {PipelineMouseService} from './pipeline-mouse.service'
@Directive({
  selector: 'svg:rect[pipeline-node-directive]'
})
export class PipelineNodeDirective {
  //Se necesita saber las propiedades del nodo
  @Input('pipeline-node-directive') node: PipelineNode;
  // Tambien la proporcion en el eje X (Global Position vs Local Position)
  constructor(private el: ElementRef,private pipMouseService : PipelineMouseService) {
  }
  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    let subscription : Subscription;
    let lastX = 0;
    let lastY = 0;
    subscription= this.pipMouseService.getMouseEvents().subscribe((event)=>{
      if(event.name === "mousemove"){
        if(lastX === 0 && lastY === 0){

        }else{
          this.node.x += (event.x - lastX);
          this.node.y += (event.y - lastY);
        }
        lastX = event.x;
        lastY = event.y;
      }else if(event.name === "mouseup"){
        this.node.x += (event.x - lastX);
          this.node.y += (event.y - lastY);
        subscription.unsubscribe();
      }else if(event.name === "mouseleave"){
        subscription.unsubscribe();
      }
    })
  }
}
