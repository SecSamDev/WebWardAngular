import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map'
import { AppSettings } from '../appSettings';
import { AlertService } from '../alert/alert.service';

import { PipelineNode, PipelineNodeAtribute, pipelineNodeFromJSON } from './node';
import { PIPE_TAGS } from './node';
import { Pipeline } from './pipeline'


@Injectable()
export class PipelineService {
  private nodes: PipelineNode[] = [];
  private _nodes: any[] = [];
  private pipelines: Pipeline[] = [];
  private lastSearchPipe: number = Date.now() - 20000;
  private lastSearchNode: number = Date.now() - 20000;
  private subscriber: Subscriber<boolean>;
  private pullerObserver: Observable<boolean>;

  constructor(private http: HttpClient,
    private alertService: AlertService
  ) {
    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });
  }

  findPipeline(id: string) {
    return this.http.get(AppSettings.API_ENDPOINT + 'pipeline/' + id).map(data => data as Pipeline);
  }
  findPipelines() {
    return new Observable<Pipeline[]>((observer) => {
      if ((Date.now() - this.lastSearchPipe) > 10000) {
        this.lastSearchPipe = Date.now();
        this.http.get(AppSettings.API_ENDPOINT + 'pipeline').map(data => data as Pipeline[]).subscribe(data => {
          this.pipelines = data;
          observer.next(data);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        })
      } else {
        //Return cached data
        observer.next(this.pipelines);
        observer.complete();
      }
    })
  }
  createPipeline(pipeline: Pipeline) {
    this.lastSearchPipe == this.lastSearchPipe - 20000;
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
    this.lastSearchPipe == this.lastSearchPipe - 20000;
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
    this.lastSearchPipe == this.lastSearchPipe - 20000;
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
  getNodesForPipeline(pipeline: Pipeline): Observable<PipelineNode[]> {
    return new Observable<PipelineNode[]>((observer) => {
      if ((Date.now() - this.lastSearchNode) > 10000) {
        this.lastSearchNode = Date.now();
        this.http.get(AppSettings.API_ENDPOINT + 'pipeline/' + pipeline.id + '/node').map((data: any[]) => {
          let pipes: PipelineNode[] = [];
          console.log(data)
          let auxPipe: PipelineNode[] = data as PipelineNode[];
          for (let i = 0; i < auxPipe.length; i++) {
            let aux = pipelineNodeFromJSON(auxPipe[i]);
            pipes.push(aux)
          }
          for (let i = 0; i < pipes.length; i++) {
            pipes[i].fillReferences(pipes)
          }
          return pipes;
        }).subscribe(pipes => {
          this.addNodesToCache(pipes);
          console.log("From API")
          observer.next(pipes)
          observer.complete();
        }, err => {
          observer.error(err)
        });
      } else {
        //Return cached data
        console.log("From cache")
        observer.next(this.findNodesInCache(pipeline));
        observer.complete();
      }
    })
  }
  getAllNodesUser(): Observable<PipelineNode[]> {
    return this.http.get(AppSettings.API_ENDPOINT + 'pipeline/nodes').map(data => data as PipelineNode[]);
  }
  createNodeForPipeline(node: PipelineNode): Observable<any> {
    this.lastSearchNode == this.lastSearchNode - 20000;
    return new Observable(observer => {
      this.http.post(AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node', node, { responseType: 'json' })
        .subscribe(data => {
          let data2 = data as PipelineNode;
          Object.assign(node, data2);
          this.addNodeToCache(node);
          this.notify();
          observer.next(data);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        });
    });
  }
  removeNodeForPipeline(node: PipelineNode) {
    this.lastSearchNode == this.lastSearchNode - 20000;
    return new Observable(observer => {
      this.http.delete(AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node/' + node.id, { responseType: 'json' })
        .subscribe(data => {
          this.removeNodeInCache(node);
          this.notify();
          observer.next(data);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        });
    });
  }
  updateNodeForPipeline(node: PipelineNode) {
    this.lastSearchNode == this.lastSearchNode - 20000;
    let dif = this.getDiffNodeInCache(node);
    return new Observable(observer => {
      if (dif === null) {
        observer.next({})
        observer.complete();
      } else {
        this.http.put(AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node/' + node.id, dif, { responseType: 'json' })
          .subscribe(data => {
            console.log("Updated Node " + node.id)
            this.updateNodeInCache(node);
            observer.next(data);
            observer.complete();
          }, err => {
            observer.error(err);
            observer.complete();
          });
      }
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
  private addNodesToCache(nodes: PipelineNode[]): void {
    for (let i = 0; i < nodes.length; i++) {
      this.addNodeToCache(nodes[i]);
    }
  }
  private addNodeToCache(node: PipelineNode): void {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].id === node.id) {
        //Node exists so update and end
        Object.assign(this.nodes[i], node);
        this._nodes[i] = Object.assign({},node)
        return;
      }
    }
    this.nodes.push(node);
    this._nodes.push(Object.assign({}, node));
  }
  private findNodesInCache(pipe: Pipeline): PipelineNode[] {
    let retNodes: PipelineNode[] = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].pipe === pipe.id) {
        retNodes.push(this.nodes[i])
      }
    }
    return retNodes;
  }
  private removeNodeInCache(node: PipelineNode) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].id === node.id) {
        this.nodes.splice(i, 1);
        this._nodes.splice(i, 1);
        return;
      }
    }
  }
  private removeNodesInCache(pipe: Pipeline): PipelineNode[] {
    this.lastSearchNode -= 20000;
    let retNodes: PipelineNode[] = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].pipe === pipe.id) {
        this.nodes.splice(i, 1);
        this._nodes.splice(i, 1);
        i--;
      }
    }
    return retNodes;
  }
  private getDiffNodeInCache(node: PipelineNode) {
    let diff = Object.assign({},node)
    for (let i = 0; i < this._nodes.length; i++) {
      if (this._nodes[i].id === node.id) {
        let keys = Object.keys(this._nodes[i]);
        for (let j = 0; j < keys.length; j++) {
          if (deepEqual(this._nodes[i][keys[j]],node[keys[j]])) {
            delete diff[keys[j]];
          }
        }
        break;
      }
    }
    if((Object.keys(diff)).length  < 1)
      return null;
    else{
      diff.id = node.id;
      return diff;
    }
      
  }
  private updateNodeInCache(node: PipelineNode) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].id === node.id) {
        this.nodes[i] = node;
        this._nodes[i] = Object.assign({},node)
        return;
      }
    }
  }

}
function deepEqual(x, y,deep = 4) {
  if(deep < 0)
    return true;
  if (typeof x !== "object" && x === y) {
    return true;
  }else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
    if (Object.keys(x).length != Object.keys(y).length)
      return false;
    for (var prop in x) {
      if (y.hasOwnProperty(prop))
      {  
        if (! deepEqual(x[prop], y[prop],deep-1))
          return false;
      }
      else
        return false;
    }

    return true;
  }
  else 
    return false;
}