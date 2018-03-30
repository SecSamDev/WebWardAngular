import { Injectable } from '@angular/core';
import { PipelineNode, NodeConector } from './node';
import { AlertService } from '../alert/alert.service'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import { of } from "rxjs/observable/of";
import 'rxjs/add/operator/map'

export class HosePipe {
  /**
   * El conector de origen. Solo copia valores del origen real, luego es un conector distinto al real.
   * Esto es asi para poder renderizar en tiempo real la recta
   */
  origin: NodeConector;
  /**
   * El conector de origen real. Es la referencia al objeto.
   */
  realOrigin: NodeConector;
  /**
   * Posicion final en el eje x del hosepipe
   */
  x: number = 0;
  /**
   * Posicion final en el eje y del hosepipe
   */
  y: number = 0;
  active: boolean = false;
}

@Injectable()
export class HosePipeService {
  public hosepipe: HosePipe;
  private subscriber: Subscriber<HosePipe>;
  private pullerObserver: Observable<HosePipe>;
  constructor(
    private alertService: AlertService
  ) {
    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });
    this.hosepipe = new HosePipe();
    this.hosepipe.origin = new NodeConector();
    this.hosepipe.origin.x = 0;
    this.hosepipe.origin.y = 0;
  }
  getHosePipe() {
    return this.hosepipe;
  }
  setPos(x: number, y: number) {
    if (this.hosepipe.active) {
      this.hosepipe.x += x;
      this.hosepipe.y += y;
    } else {
      this.hosepipe.x = 0;
      this.hosepipe.y = 0;
    }

  }
  //TODO : Desacoplar el sistema por completo
  setOrigin(conector: NodeConector) {
    //FALSIFY the connector
    this.hosepipe.realOrigin = conector;
    this.hosepipe.origin.x = conector.x + conector.originNode.x;
    this.hosepipe.origin.y = conector.y + conector.originNode.y;
    this.hosepipe.origin.originNode = conector.originNode;
    this.hosepipe.origin.type = conector.type;
    //At the moment the x and y target position of the hose pipe are in the same position as the origin conector
    this.hosepipe.x = this.hosepipe.origin.x;
    this.hosepipe.y = this.hosepipe.origin.y;
  }
  clean() {
    this.hosepipe.origin = new NodeConector();
    this.hosepipe.x = 0;
    this.hosepipe.y = 0;
  }
}