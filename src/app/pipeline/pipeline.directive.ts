import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';
import { PipelineNode } from './node';
@Directive({
  selector: 'svg:g[pipeline-directive]'
})
export class PipelineDirective {
  currentMatrix = [];
  @Input('pipeline-directive') node: PipelineNode;
  @Input('propX') propX : number;
  @Input('propY') propY : number;
  @Input('dx') dx : number;
  @Input('dy') dy : number;
  constructor(private el: ElementRef) {
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
    if (this.node.selected) {
      this.node.selected = false;
    }
  } 
  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    if (!this.node.selected) {
      this.node.selected = true;
      const rect = this.el.nativeElement.getBoundingClientRect();

    }
  }
  
  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    if (this.node.selected) {
      this.node.selected = false;
    }
  }
  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    if (this.node.selected) {
      this.moveElement(event.layerX,event.layerY)
    }

  }
  /*
  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      console.log("click")
    }
  }*/
  private moveElement(x : number, y : number){
    const rect = this.el.nativeElement.getBoundingClientRect();
    //console.log(rect)
    //console.log(this.node.x + " NODE " + this.node.y)
    //console.log(x + " X " + y)
    //console.log(this.dx + " dX " + this.dy)
    let aux = rect.width/2 + rect.left - this.dx;
    let dCenterX = Math.abs(x - aux);
    console.log("Aux " + aux + " x " + x)
    aux = rect.height/2 + rect.top;
    let dCenterY = (Math.max(y,aux) - Math.min(y,aux));
    //console.log("D centro " +  dCenterX +":"+ dCenterY)
    this.node.x= (x-this.dx )*this.propX - dCenterX;
    this.node.y = (y-this.dy)*this.propY + 50;
    
    //console.log(this.node.x + " NODE " + this.node.y)
    /*
    let dx = x - this.node.x;
    let dy = y - this.node.y;
    this.currentMatrix[4] += dx;
    this.currentMatrix[5] += dy;
    let newMatrix = "matrix(" + this.currentMatrix.join(' ') + ")";
    console.log(newMatrix)
    this.transformado = newMatrix;
    this.node.x = dx;
    this.node.y = dy;
    */
  }
}
