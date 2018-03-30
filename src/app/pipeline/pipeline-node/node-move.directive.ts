import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PipelineNode } from '../node';
import {PipelineMouseService} from '../pipeline-mouse.service'
@Directive({
  selector: 'svg:rect[node-move-directive]'
})
export class NodeMoveDirective {
  //Se necesita saber las propiedades del nodo
  @Input('node-move-directive') node: PipelineNode;
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
          this.moveNode((event.x - lastX),(event.y - lastY));
        }
        lastX = event.x;
        lastY = event.y;
      }else if(event.name === "mouseup"){
        this.moveNode((event.x - lastX),(event.y - lastY));
        subscription.unsubscribe();
      }else if(event.name === "mouseleave"){
        subscription.unsubscribe();
      }
    })
  }
  /**
   * Moves the node. Protects the movement from draganddrop errors
   * @param difX 
   * @param difY 
   */
  moveNode(difX : number,difY : number){
    if(difX < 200 && difX < 200){
      this.node.x += difX;
          this.node.y += difY;
    }
  }
}
