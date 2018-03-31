import { Directive, HostListener, ElementRef, Input, HostBinding } from '@angular/core';
import { PipelineNode, NodeConnector, IO_TYPES } from '../node';
import { HosePipeService, HosePipe } from '../hose-pipe.service'
import { PipelineMouseService } from '../pipeline-mouse.service'
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: 'svg:circle[node-pipe-me-directive]'
})
export class NodePipeMeDirective {
  //Se necesita saber las propiedades del nodo
  @Input('node-pipe-me-directive') nodeConnector: NodeConnector;
  private hosepipe: HosePipe;
  constructor(private el: ElementRef, private hosePipeService: HosePipeService, private pipeMouseService: PipelineMouseService) {
    this.hosepipe = hosePipeService.getHosePipe();
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    if (event.target == this.el.nativeElement) {
      this.hosepipe.active = true;
      this.hosePipeService.clean();
      this.hosePipeService.setOrigin(this.nodeConnector)
      let subscription: Subscription;
      let lastX = 0;
      let lastY = 0;
      subscription = this.pipeMouseService.getMouseEvents().subscribe((event) => {
        if (event.name === "mousemove") {
          if (lastX === 0 && lastY === 0) {
            this.hosepipe.x = this.nodeConnector.x + this.nodeConnector.originNode.x;
            this.hosepipe.y = this.nodeConnector.y + this.nodeConnector.originNode.y;
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
          this.hosePipeService.clean();
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
        this.hosepipe.realOrigin.joinToConnector(this.nodeConnector)
        this.hosePipeService.clean();
      }
    }
  }
}
