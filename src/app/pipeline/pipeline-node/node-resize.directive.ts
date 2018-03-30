import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';
import { PipelineNode, minHeight, minWidth } from '../node';
import { PipelineMouseService } from '../pipeline-mouse.service'
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: 'svg:rect[node-resize-directive]'
})
export class NodeResizeDirective {
  //Se necesita saber las propiedades del nodo
  @Input('node-resize-directive') node: PipelineNode;

  constructor(private el: ElementRef, private pipMouseService: PipelineMouseService) {
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    let subscription: Subscription;
    let lastX = 0;
    let lastY = 0;
    subscription = this.pipMouseService.getMouseEvents().subscribe((event) => {
      if (event.name === "mousemove") {
        if (lastX === 0 && lastY === 0) {

        } else {
          this.node.width += (event.x - lastX);
          this.node.height += (event.y - lastY);
          if (this.node.width < minWidth) {
            this.node.width = minWidth;
          }
          if (this.node.height < minHeight) {
            this.node.height = minHeight;
          }
        }
        this.node.recalculate();
        lastX = event.x;
        lastY = event.y;
      } else if (event.name === "mouseup") {
        this.node.width += (event.x - lastX);
        this.node.height += (event.y - lastY);
        this.node.recalculate();
        subscription.unsubscribe();
      } else if (event.name === "mouseleave") {
        subscription.unsubscribe();
      }
    })
  }
}
