import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';
import { PipelineNode, NodeConector, IO_TYPES } from '../node';
import { HosePipeService, HosePipe } from '../hose-pipe.service'
import { PipelineMouseService } from '../pipeline-mouse.service'
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: 'svg:circle[node-pipe-me-directive]'
})
export class NodePipeMeDirective {
  //Se necesita saber las propiedades del nodo
  @Input('node-pipe-me-directive') nodeConector: NodeConector;
  private hosepipe: HosePipe;
  constructor(private el: ElementRef, private hosePipeService: HosePipeService, private pipeMouseService: PipelineMouseService) {
    this.hosepipe = hosePipeService.getHosePipe();
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    if (event.target == this.el.nativeElement) {
      this.hosepipe.active = true;
      this.hosePipeService.clean();
      this.hosePipeService.setOrigin(this.nodeConector)
      let subscription: Subscription;
      let lastX = 0;
      let lastY = 0;
      subscription = this.pipeMouseService.getMouseEvents().subscribe((event) => {
        if (event.name === "mousemove") {
          if (lastX === 0 && lastY === 0) {
            this.hosepipe.x = this.nodeConector.x + this.nodeConector.originNode.x;
            this.hosepipe.y = this.nodeConector.y + this.nodeConector.originNode.y;
          } else {
            this.hosepipe.x += (event.x - lastX);
            this.hosepipe.y += (event.y - lastY);
          }
          lastX = event.x;
          lastY = event.y;
        } else if (event.name === "mouseup") {
          this.hosePipeService.clean();
          subscription.unsubscribe();
        } else if (event.name === "mouseleave") {
          subscription.unsubscribe();
        }
      })
    }
  }
  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    if (event.target == this.el.nativeElement) {
      if (!this.hosepipe.active) {
        this.hosePipeService.clean();
      } else {
        //--------------------------------- TODO refactorizar para tener en cuenta los parametros de entrada y salida
        switch (this.nodeConector.type) {
          case IO_TYPES.INPUT://Nuestro nodo es de entrada
            switch (this.hosepipe.realOrigin.type) {//El otro nodo seleccionado
              case IO_TYPES.INPUT:
                //Notify user
                break;
              case IO_TYPES.OUTPUT:
                this.hosepipe.realOrigin.conectedNodes.push(this.nodeConector)
                break;
              case IO_TYPES.ERR:
                this.hosepipe.realOrigin.conectedNodes.push(this.nodeConector)
                break;
            }
            break;
          case IO_TYPES.OUTPUT://Nuestro nodo es de salida
            switch (this.hosepipe.realOrigin.type) {
              case IO_TYPES.INPUT://El otro de entrada
                this.nodeConector.conectedNodes.push(this.hosepipe.realOrigin)
                break;
              case IO_TYPES.OUTPUT:
                break;
              case IO_TYPES.ERR:
                break;
            }
            break;
          case IO_TYPES.ERR:// Nuestra salida es de error
            switch (this.hosepipe.realOrigin.type) {
              case IO_TYPES.INPUT://El otro de entrada
                this.nodeConector.conectedNodes.push(this.hosepipe.realOrigin)
                break;
              case IO_TYPES.OUTPUT:
                break;
              case IO_TYPES.ERR:
                break;
            }
            break;
        }//END SWITCH
        this.hosePipeService.clean();
      }
    }
  }
}
