import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';
import { PipelineNode } from '../node';
import {HosePipeService,HosePipe,IO_TYPES} from '../hose-pipe.service'



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
  private hosepipe : HosePipe;
  constructor(private el: ElementRef,private hosePipeService : HosePipeService) {
    this.hosepipe = hosePipeService.getHosePipe();
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    if (event.target == this.el.nativeElement) {
      if (!this.hosepipe.active) {
        this.hosePipeService.clean();
        this.hosePipeService.setOrigin(this.node,event.clientX,event.clientY,this.type)
      }
    }
  }
  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    if (event.target == this.el.nativeElement) {
      if (!this.hosepipe.active) {
        this.hosePipeService.clean();
      } else {
        //--------------------------------- TODO refactorizar para tener en cuenta los parametros de entrada y salida
        switch (this.type) {
          case IO_TYPES.INPUT://Nuestro nodo es de entrada
            switch (this.hosepipe.originType) {//El otro nodo seleccionado
              case IO_TYPES.INPUT:
                //Notify user
                break;
              case IO_TYPES.OUTPUT:
                this.hosepipe.origin.outputNodes.push(this.node)
                break;
              case IO_TYPES.ERR:
                this.hosepipe.origin.errorNodes.push(this.node)
                break;
            }
            break;
          case IO_TYPES.OUTPUT://Nuestro nodo es de salida
            switch (this.hosepipe.originType) {
              case IO_TYPES.INPUT://El otro de entrada
                this.node.outputNodes.push(this.hosepipe.origin)
                break;
              case IO_TYPES.OUTPUT:
                break;
              case IO_TYPES.ERR:
                break;
            }
            break;
          case IO_TYPES.ERR:// Nuestra salida es de error
            switch (this.hosepipe.originType) {
              case IO_TYPES.INPUT://El otro de entrada
                this.node.errorNodes.push(this.hosepipe.origin)
                break;
              case IO_TYPES.OUTPUT:
                break;
              case IO_TYPES.ERR:
                break;
            }
            break;
        }//END SWITCH
        console.log(this.node)
        console.log(this.hosepipe.origin)
        this.hosePipeService.clean();
      }
    }
  }
}
