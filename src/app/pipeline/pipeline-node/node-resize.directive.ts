import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';
import { PipelineNode } from '../node';
@Directive({
  selector: 'svg:rect[node-resize-directive]'
})
export class NodeResizeDirective {
  //Se necesita saber las propiedades del nodo
  @Input('node-resize-directive') node: PipelineNode;
  // Tambien la proporcion en el eje X (Global Position vs Local Position)
  @Input('propX') propX: number;
  @Input('propY') propY: number;
  lastX = 0;
  lastY = 0;
  constructor(private el: ElementRef) {
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    if (event.target == this.el.nativeElement && !this.node.selected) {
      this.node.selected = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
    }
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
    if (this.node.selected && event.target == this.el.nativeElement) {
      this.node.selected = false;
    }
  }
  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    if (this.node.selected && event.target == this.el.nativeElement) {
      this.node.selected = false;
    }
  }
  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    if (this.node.selected && event.target == this.el.nativeElement) {
      this.moveElement(event.clientX, event.clientY)
      this.lastX = event.clientX;
      this.lastY = event.clientY;
    }

  }
  private moveElement(x: number, y: number) {
    
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.node.width += (x - this.lastX) * this.propX;
    this.node.height += (y - this.lastY) * this.propY;
  }
}
