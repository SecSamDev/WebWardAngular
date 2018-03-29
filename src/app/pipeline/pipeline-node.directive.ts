import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';
import { PipelineNode } from './node';
@Directive({
  selector: 'svg:rect[pipeline-node-directive]'
})
export class PipelineNodeDirective {
  //Se necesita saber las propiedades del nodo
  @Input('pipeline-node-directive') node: PipelineNode;
  // Tambien la proporcion en el eje X (Global Position vs Local Position)
  @Input('propX') propX: number;
  @Input('propY') propY: number;
  //Y la posicion con respecto al borde
  @Input('dx') dx: number;
  @Input('dy') dy: number;

  lastX = 0;
  lastY = 0;
  constructor(private el: ElementRef) {
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
    if (event.target == this.el.nativeElement &&this.node.selected) {
      this.node.selected = false;
    }
  }
  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    if (event.target == this.el.nativeElement && !this.node.selected) {
      this.node.selected = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
    }
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    if (this.node.selected) {
      this.node.selected = false;
    }
  }
  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    if (event.target == this.el.nativeElement && this.node.selected) {
      this.moveElementDif(event.clientX, event.clientY)
      this.lastX = event.clientX;
      this.lastY = event.clientY;
    }
  }

  /**
   * Move the element but first puts the center of the element in the mouse Event
   * @param x Mouse X position (global)
   * @param y Mouse Y position (global)
   */
  private moveElement(x: number, y: number) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.node.x += (x  - rect.width / 2 - rect.left) * this.propX;
    this.node.y += (y  - rect.height / 2 - rect.top) * this.propY;
  }

  /**
   * Move the element from respect the last position
   * @param x Mouse X position (global)
   * @param y Mouse Y position (global)
   */
  private moveElementDif(x: number, y: number) {
    this.node.x += (x  - this.lastX) * this.propX;
    this.node.y += (y  - this.lastY) * this.propY;
  }
}
