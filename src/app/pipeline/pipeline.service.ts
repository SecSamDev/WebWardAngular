import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import { WebProjectService } from '../web-project/index';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { PipelineNode, PipelineNodeAtribute, pipelineNodeFromJSON } from './node';
import { PIPE_TAGS } from './node';
import { Pipeline } from './pipeline'
import { AppSettingsService } from '../app-settings.service';
import { getStoredNodes, removeStoredNode, updateStoredNode, createStoredNode } from './stored-nodes'

@Injectable()
export class PipelineService {
  private nodes: PipelineNode[] = [];
  private _nodes: any[] = [];
  private pipelines: Pipeline[] = [];
  private lastSearchPipe: number = Date.now() - 20000;
  private lastSearchNode: number = Date.now() - 20000;
  private subscriber: Subscriber<boolean>;
  private pullerObserver: Observable<boolean>;
  private activeCache;

  constructor(
    private AppSettings: AppSettingsService,
    private http: HttpClient,
    private webProjServ: WebProjectService
  ) {
    this.activeCache = false;
    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });
    this.webProjServ.subscribeToWebProjects().subscribe((data) => {
      this.clearCache();
      this.notify();
    }, err => { })
  }
  clearCache() {
    this.nodes = [];
    this._nodes = [];
    this.pipelines = [];
    this.lastSearchPipe -= 30000;
    this.lastSearchNode -= 30000;
  }
  findPipeline(id: string) {
    return this.http.get(this.AppSettings.API_ENDPOINT + 'pipeline/' + id).map(data => data as Pipeline);
  }
  findPipelines() {
    return new Observable<Pipeline[]>((observer) => {
      if ((!this.activeCache) || (Date.now() - this.lastSearchPipe) > 10000) {
        this.lastSearchPipe = Date.now();
        this.http.get(this.AppSettings.API_ENDPOINT + 'pipeline?web_project=' + this.webProjServ.getActualProject().id).map(data => data as Pipeline[]).subscribe(data => {
          this.pipelines = data;
          observer.next(data);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        })
      } else {
        //Return cached data
        observer.next(this.getPipelinesForWebProject(this.webProjServ.getActualProject().id));
        observer.complete();
      }
    })
  }
  getStoredNodes() {
    return new Observable<PipelineNode[]>((observer) => {
      getStoredNodes(this.http, this.AppSettings).subscribe(data => {
        let pipes: PipelineNode[] = [];
        let auxPipe: PipelineNode[] = data as PipelineNode[];
        for (let i = 0; i < auxPipe.length; i++) {
          let aux = pipelineNodeFromJSON(auxPipe[i]);
          pipes.push(aux)
        }
        observer.next(pipes)
        observer.complete();
      }, err => {
        observer.error()
        observer.complete();
      })
    });
  }
  removeStoredNode(node: PipelineNode) {
    return removeStoredNode(this.http, this.AppSettings, node);
  }
  newStoredNode(node: PipelineNode) {
    return createStoredNode(this.http, this.AppSettings, node);
  }

  createPipeline(pipeline: Pipeline) {
    this.lastSearchPipe == this.lastSearchPipe - 20000;
    this.clearCache();
    pipeline.web_project = this.webProjServ.getActualProject().id;
    return new Observable<Pipeline>(observer => {
      this.http.post(this.AppSettings.API_ENDPOINT + 'pipeline', pipeline, { responseType: 'json' }).map(data => data as Pipeline)
        .subscribe(data => {
          this.notify();
          observer.next(data);
          observer.complete();
        }, err => {
          observer.error(err);
        });
    });
  }
  updatePipeline(pipeline: Pipeline) {
    this.lastSearchPipe == this.lastSearchPipe - 20000;
    return new Observable(observer => {
      this.http.put(this.AppSettings.API_ENDPOINT + 'pipeline/' + pipeline.id, pipeline, { responseType: 'json' })
        .subscribe(data => {
          this.notify();
          observer.next(data);
          observer.complete();
        }, err => {
          observer.error(err);
        });
    });
  }
  deletePipeline(pipeline: Pipeline) {
    this.lastSearchPipe == this.lastSearchPipe - 20000;
    this.clearCache();
    return new Observable(observer => {
      this.http.delete(this.AppSettings.API_ENDPOINT + 'pipeline/' + pipeline.id, { responseType: 'json' })
        .subscribe(data => {
          this.notify();
          observer.next(data);
          observer.complete();
        }, err => {
          observer.error(err);
        });
    });
  }
  checkPipelineStatus(pipeline: Pipeline): Observable<Pipeline> {
    this.activeCache = false;
    return Observable.interval(1000).flatMap(i => {
      return new Observable(observer => {
        this.findPipeline(pipeline.id).subscribe((data) => {
          if (data.last_update !== pipeline.last_update) {
            observer.next(data);
            observer.complete();
          }
        }, err => { })
      })
    })
  }
  getNode(node: PipelineNode) {
    return this.http.get(this.AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node/' + node.id);
  }
  getNodesForPipeline(pipeline: Pipeline): Observable<PipelineNode[]> {
    return new Observable<PipelineNode[]>((observer) => {
      if ((this.activeCache) && (this.nodesForPipelineInCache(pipeline) && (Date.now() - this.lastSearchNode) < 10000)) {
        //Return cached data
        console.log("From cache")
        observer.next(this.findNodesInCache(pipeline));
        observer.complete();
      } else {
        this.lastSearchNode = Date.now();
        this.http.get(this.AppSettings.API_ENDPOINT + 'pipeline/' + pipeline.id + '/node').map((data: any[]) => {
          let pipes: PipelineNode[] = [];
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
      }
    })
  }
  getAllNodesUser(): Observable<PipelineNode[]> {
    return this.http.get(this.AppSettings.API_ENDPOINT + 'pipeline/nodes').map(data => data as PipelineNode[]);
  }
  createNodeForPipeline(node: PipelineNode): Observable<any> {
    this.lastSearchNode == this.lastSearchNode - 20000;
    this.clearCache();
    return new Observable(observer => {
      this.http.post(this.AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node', node, { responseType: 'json' })
        .subscribe(data => {
          let data2 = data as PipelineNode;
          console.log(data2)
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
    this.clearCache();
    return new Observable(observer => {
      this.http.delete(this.AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node/' + node.id, { responseType: 'json' })
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
    let dif = this.activeCache ? this.getDiffNodeInCache(node) : node;
    return new Observable(observer => {
      if (dif === null) {
        observer.next({})
        observer.complete();
      } else {
        this.http.put(this.AppSettings.API_ENDPOINT + 'pipeline/' + node.pipe + '/node/' + node.id, dif, { responseType: 'json' })
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
  getNodeTemplates() {
    return this.http.get(this.AppSettings.API_ENDPOINT + 'node_templates').map((data: any[]) => {
      let retData: PipelineNode[] = [];
      for (let i = 0; i < data.length; i++) {
        let auxNode = data[i];
        let newNode = pipelineNodeFromJSON(auxNode)
        retData.push(newNode)
      }
      return retData;
    });
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
        this._nodes[i] = Object.assign({}, node)
        return;
      }
    }
    this.nodes.push(node);
    this._nodes.push(Object.assign({}, node));
  }
  private nodesForPipelineInCache(pipe: Pipeline): boolean {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].pipe === pipe.id) {
        return true;
      }
    }
    return false;
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
  private getPipelinesForWebProject(id: string) {
    let arr: Pipeline[] = [];
    for (let i = 0; i < this.pipelines.length; i++) {
      if (this.pipelines[i].web_project === id) {
        arr.push(this.pipelines[i])
      }
    }
    return arr;
  }
  private getDiffNodeInCache(node: PipelineNode) {
    let diff = Object.assign({}, node)
    for (let i = 0; i < this._nodes.length; i++) {
      if (this._nodes[i].id === node.id) {
        let keys = Object.keys(this._nodes[i]);
        for (let j = 0; j < keys.length; j++) {
          if (deepEqual(this._nodes[i][keys[j]], node[keys[j]])) {
            delete diff[keys[j]];
          }
        }
        break;
      }
    }
    if ((Object.keys(diff)).length < 1)
      return null;
    else {
      diff.id = node.id;
      return diff;
    }

  }
  private updateNodeInCache(node: PipelineNode) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].id === node.id) {
        this.nodes[i] = node;
        this._nodes[i] = Object.assign({}, node)
        return;
      }
    }
  }

}
function deepEqual(x, y, deep = 4) {
  if (deep < 0)
    return true;
  if (typeof x !== "object" && x === y) {
    return true;
  } else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
    if (Object.keys(x).length != Object.keys(y).length)
      return false;
    for (var prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop], deep - 1))
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