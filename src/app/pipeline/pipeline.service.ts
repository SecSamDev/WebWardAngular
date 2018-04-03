import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map'
import { AppSettings } from '../appSettings';
import { AlertService } from '../alert/alert.service';

import { PipelineNode, PipelineNodeAtribute ,pipelineNodeFromJSON} from './node';
import { PIPE_TAGS } from './node';
import { Pipeline } from './pipeline'


@Injectable()
export class PipelineService {
  private nodes: PipelineNode[] = [];
  private pipelines: Pipeline[] = [];
  private subscriber: Subscriber<boolean>;
  private pullerObserver: Observable<boolean>;

  constructor(private http: HttpClient,
    private alertService: AlertService
  ) {
    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });
    let aux = new PipelineNode("pipe1", "my2TAG", PIPE_TAGS.START);
    let aux2 = new PipelineNode("pipe2", "myTAG", PIPE_TAGS.ANY);
    let aux3 = new PipelineNode("pipe3", "myTAG3", PIPE_TAGS.ANY);
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
  findPipeline(id: string) {
    return this.http.get(AppSettings.API_ENDPOINT + 'pipeline/' + id).map(data => data as Pipeline);
  }
  findPipelines() {
    return this.http.get(AppSettings.API_ENDPOINT + 'pipeline').map(data => data as Pipeline[]);
  }
  createPipeline(pipeline: Pipeline) {
    return new Observable(observer => {
      this.http.post(AppSettings.API_ENDPOINT + 'pipeline', pipeline, { responseType: 'json' })
        .subscribe(data => {
          this.notify();
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  updatePipeline(pipeline: Pipeline) {
    return new Observable(observer => {
      this.http.put(AppSettings.API_ENDPOINT + 'pipeline/' + pipeline.id, pipeline, { responseType: 'json' })
        .subscribe(data => {
          this.notify();
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  deletePipeline(pipeline: Pipeline) {
    return new Observable(observer => {
      this.http.delete(AppSettings.API_ENDPOINT + 'pipeline/' + pipeline.id, { responseType: 'json' })
        .subscribe(data => {
          this.notify();
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  getNodesForPipeline(name: string) {
    return this.http.get(AppSettings.API_ENDPOINT + 'pipeline/' + name + '/node').map((data :any[]) => { 
      let pipes :PipelineNode[] = [];
      let auxPipe : PipelineNode[] = data as PipelineNode[];
      for(let i = 0; i < auxPipe.length;i++){
        let aux = pipelineNodeFromJSON(auxPipe[i]);
        pipes.push(aux)
      }
      for(let i = 0; i < pipes.length;i++){
        pipes[i].fillReferences(pipes)
      }
      console.log(pipes)
      return pipes;
    });
  }
  createNodeForPipeline(node: PipelineNode) {
    return new Observable(observer => {
      this.http.post(AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node', node, { responseType: 'json' })
        .subscribe(data => {
          this.notify();
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  removeNodeForPipeline(node: PipelineNode) {
    return new Observable(observer => {
      this.http.delete(AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node/' + node.id, { responseType: 'json' })
        .subscribe(data => {
          this.notify();
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  updateNodeForPipeline(node : PipelineNode){
    return new Observable(observer => {
      this.http.put(AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node/'+node.id,node.toJSON(), { responseType: 'json' })
        .subscribe(data => {
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  /**
     * Get notified when a object is deleted, update or created.
     * Dont use it in @Input Components
     */
  subscribeToPipelines(): Observable<boolean> {
    return this.pullerObserver;
  }

  /**
   * Use internally
   */
  private notify() {
    try {
      this.subscriber.next(true);
    } catch (err) { }

  }

}

