import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';
import { PipelineNode } from './node';
@Directive({
  selector: 'svg:rect[pipeline-node-directive]'
})
export class PipelineNodeDirective {
  currentMatrix = [];
  //Se necesita saber las propiedades del nodo
  @Input('pipeline-node-directive') node: PipelineNode;
  // Tambien la proporcion en el eje X (Global Position vs Local Position)
  @Input('propX') propX: number;
  @Input('propY') propY: number;
  //Y la posicion con respecto al borde
  @Input('dx') dx: number;
  @Input('dy') dy: number;
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
    }
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    if (this.node.selected) {
      this.node.selected = false;
    }
  }
  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    if (this.node.selected) {
      this.moveElement(event.layerX, event.layerY)
      console.log("Move? : " +event.layerX + " " + event.layerY)
    }

  }
  private moveElement(x: number, y: number) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.node.x += (x + this.dx - rect.width / 2 - rect.left) * this.propX;
    this.node.y += (y + this.dy - rect.height / 2 - rect.top) * this.propY;
  }
}
