import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';
import { PipelineNode } from '../node';

//Static element. Because you only have one hand and one mouse.
var origin: PipelineNode = null;
var originType: number = -1;

const TYPES = {
  INPUT: 0,
  OUTPUT: 1,
  ERR: 2
}

@Directive({
  selector: 'svg:circle[node-pipe-me-directive]'
})
export class NodePipeMeDirective {
  //Se necesita saber las propiedades del nodo
  @Input('node-pipe-me-directive') node: PipelineNode;
  // Tambien la proporcion en el eje X (Global Position vs Local Position)
  @Input('propX') propX: number;
  @Input('propY') propY: number;
  @Input('stdType') type: number;
  constructor(private el: ElementRef) {
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    if (event.target == this.el.nativeElement) {
      if (origin === null) {
        console.log("PIPNG down")
        origin = this.node;
        originType = this.type;
      }
    }
  }
  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    if (event.target == this.el.nativeElement) {
      if (origin === null) {
        console.log("NO PIPE")
        origin = null;
        originType = -1;
      } else {
        console.log("PIPNG UP " + this.type + " " + originType)
        //--------------------------------- TODO refactorizar para tener en cuenta los parametros de entrada y salida
        switch (this.type) {
          case TYPES.INPUT://Nuestro nodo es de entrada
            switch (originType) {//El otro nodo seleccionado
              case TYPES.INPUT:
                //Notify user
                break;
              case TYPES.OUTPUT:
                origin.outputNodes.push(this.node)
                break;
              case TYPES.ERR:
                origin.errorNodes.push(this.node)
                break;
            }
            break;
          case TYPES.OUTPUT://Nuestro nodo es de salida
            switch (originType) {
              case TYPES.INPUT://El otro de entrada
                this.node.outputNodes.push(origin)
                break;
              case TYPES.OUTPUT:
                break;
              case TYPES.ERR:
                break;
            }
            break;
          case TYPES.ERR:// Nuestra salida es de error
            switch (originType) {
              case TYPES.INPUT://El otro de entrada
                this.node.errorNodes.push(origin)
                break;
              case TYPES.OUTPUT:
                break;
              case TYPES.ERR:
                break;
            }
            break;
        }//END SWITCH
        console.log(this.node)
        console.log(origin)
        origin = null;
        originType = -1;
      }
    }
  }
}
