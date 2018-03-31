import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map'
import { AppSettings } from '../appSettings';
import { AlertService } from '../alert/alert.service';

import { PipelineNode,PipelineNodeAtribute } from './node';
import { PIPE_TAGS } from './node';


@Injectable()
export class PipelineService {
  private nodes: PipelineNode[] = [];
  private subscriber: Subscriber<PipelineNode[]>;
  private pullerObserver: Observable<PipelineNode[]>;

  constructor(private http: HttpClient,
    private alertService: AlertService
  ) {
    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });
    let aux = new PipelineNode("pipe1","my2TAG",PIPE_TAGS.START);
    let aux2 = new PipelineNode("pipe2","myTAG",PIPE_TAGS.ANY);
    let aux3 = new PipelineNode("pipe3","myTAG3",PIPE_TAGS.ANY);
    let out1 = aux.createOutputConnector();
    let in2 = aux2.createInputConnector();
    out1.joinToConnector(in2)
    aux2.createOutputConnector();
    aux2.createErrorConnector();
    aux2.createInputConnector();
    aux3.createInputConnector();
    aux3.createErrorConnector();
    aux2.x = 512;
    aux2.y = 50;
    aux3.x = 200;
    aux3.y = 200;
    this.nodes.push(aux);
    this.nodes.push(aux2);
    this.nodes.push(aux3);
  }
  getNodesForPipeline(name : string){
    return this.nodes;
  }
  createNodeForPipeline(name : string,node : PipelineNode){
    this.nodes.push(node)
    this.notify();
  }
  removeNodeForPipeline(name : string,node : PipelineNode){
    for(let i = 0; i < this.nodes.length;i++){
      if(this.nodes[i] === node){
        this.nodes.splice(i,1)
        this.notify();
        break;
      }
    }
    
  }
  /**
     * Get notified when a object is deleted, update or created.
     * Dont use it in @Input Components
     */
    subscribeToNodes(): Observable<PipelineNode[]> {
        return this.pullerObserver;
    }

    /**
     * Use internally
     */
    private notify() {
        try{
            this.subscriber.next(this.nodes);
        }catch(err){}
        
    }

}
