import { Injectable } from '@angular/core';
import {PipelineNode} from './node';
import {AlertService} from '../alert/alert.service'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import { of } from "rxjs/observable/of";
import 'rxjs/add/operator/map'
export class HosePipe{
  origin : PipelineNode;
  ox : number;
  oy : number;
  originType : number;
  x : number = 0;
  y : number = 0;
  active : boolean = false;
}
export const IO_TYPES = {
  INPUT: 0,
  OUTPUT: 1,
  ERR: 2
}
@Injectable()
export class HosePipeService {
  public hosepipe : HosePipe;
  private subscriber: Subscriber<HosePipe>;
  private pullerObserver: Observable<HosePipe>;
  constructor(
    private alertService: AlertService
  ) {
    this.pullerObserver = new Observable(observer=>{
      this.subscriber = observer;
    });
    this.hosepipe = new HosePipe();
    this.hosepipe.ox = 0;
    this.hosepipe.oy = 0;
  }
  getHosePipe(){
    return this.hosepipe;
  }
  getHosePipeOf(){
    return of(this.hosepipe);
  }
  setPos(x:number,y:number){
    if(this.hosepipe.active){
      this.hosepipe.x += x;
      this.hosepipe.y += y;
    }else{
      this.hosepipe.x = 0;
      this.hosepipe.y = 0;
    }
    
  }
  //TODO : Desacoplar el sistema por completo
  setOrigin(node : PipelineNode,x:number,y :number, type : number){
    this.hosepipe.origin = node;
    this.hosepipe.active = true;
    if(type === IO_TYPES.ERR){
      this.hosepipe.ox = (node.x + node.width +20)
      this.hosepipe.oy = (node.y  + node.height*3/4 +20)
    }else if(type === IO_TYPES.INPUT){
      this.hosepipe.ox = node.x + 20
      this.hosepipe.oy = node.y + node.height/2 +20
    }else if(type === IO_TYPES.OUTPUT){
      this.hosepipe.ox = node.x + node.width + 20
      this.hosepipe.oy = node.y + node.height/4 +20
    }
    this.hosepipe.x = this.hosepipe.ox;
    this.hosepipe.y = this.hosepipe.oy;
    
    this.hosepipe.originType = type;
    this.notify();
  }
  clean(){
    this.hosepipe.active = false;
    this.hosepipe.ox = 0
    this.hosepipe.oy = 0
    this.hosepipe.x = 0;
    this.hosepipe.y = 0;
  }
  /**
   * Get notified when a object is deleted, update or created.
   * Dont use it in @Input Components
   */
  subscribeToHosePipe():Observable<HosePipe>{
    return this.pullerObserver;
  }

  /**
   * Use internally
   */
  private notify(){
    try{
      this.subscriber.next(this.hosepipe);
    }catch(err){}
    
  }
}