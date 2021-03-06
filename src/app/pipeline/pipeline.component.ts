import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener, ComponentFactoryResolver } from '@angular/core';
import { PipelineNode, NodeConnector, IO_TYPES, PIPE_TAGS } from './node';
import { HosePipe, HosePipeService } from './hose-pipe.service';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { PipelineMouseService } from './pipeline-mouse.service'
import { PipelineService } from './pipeline.service'
import { PipelineNodeEditComponent } from './pipeline-node-edit/pipeline-node-edit.component'
import { PipelineEditComponent } from './pipeline-edit/pipeline-edit.component'
import { Pipeline } from './pipeline';
import { AlertService } from '../alert/alert.service'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ContextualMenuComponent } from './contextual-menu/contextual-menu.component';
import { ContextualDirective } from './contextual.directive';


@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit, AfterViewInit {
  private _nodes: PipelineNode[] = [];
  private templates: PipelineNode[] = [];
  private pipelines: Pipeline[] = [];
  private actual_pipe: Pipeline = null;
  private newPipe: Pipeline = null;
  private letItBe: boolean = true;
  private hosePipe: HosePipe;
  /**
   * Allow to poll periodically the status of the nodes
   * @type boolean
   */
  private periodicStatus = false;
  private periodicNotifier: Subscription;

  /**
   * The node active, changes goes to this node
   */
  private activeNode: PipelineNode = null;
  height = 1280;
  width = 2048;
  propX = 1;
  propY = 1;
  dx = 0;
  dy = 0;
  lastX: number = 0;
  lastY: number = 0;
  @ViewChild(ContextualDirective) contextualElement: ContextualDirective;
  @ViewChild('pipeCanvas') public pipeCanvas: ElementRef;

  constructor(
    private router: Router,
    private hosePipeService: HosePipeService,
    private pipMouseService: PipelineMouseService,
    private pipService: PipelineService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private alertService: AlertService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.hosePipe = this.hosePipeService.getHosePipe();
  }
  ngAfterViewInit() {
    try {
      this.reCalculate()
    } catch (err) { }

  }
  ngOnInit() {
    this.reCalculate()
    let routersubs = this.router.events.subscribe((val) => {
      this.cleanPipes();
      routersubs.unsubscribe();
    });
    this.pipService.findPipelines().subscribe((pipes) => {
      this.pipelines = pipes;
      if (pipes.length > 0) {
        this.selectPipeline(this.pipelines[0])

      }
    }, err => {
      this.cleanPipes();
    })
    this.pipService.getNodeTemplates().subscribe((nodes) => {
      this.templates = nodes;
    }, err => { })
    this.pipService.subscribeToPipelines().subscribe((data) => {
      this.pipService.findPipelines().subscribe((data) => {

        if (data.length === 0) {
          this.cleanPipes();
        } else {
          let found = false;
          this.pipelines = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === this.actual_pipe.id) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.actual_pipe = data[0];
          }
          this.pipService.getNodesForPipeline(this.actual_pipe).subscribe((data) => {
            this._nodes = data;
          }, err => { })
        }
      }, err => {
        this.cleanPipes();
      })

    }, err => {
      this.cleanPipes();
    })
  }
  get nodes(): PipelineNode[] {
    return this._nodes;
  }
  @Input()
  set nodes(nodes: PipelineNode[]) {
    this._nodes = nodes;
  }
  cleanPipes() {
    this.actual_pipe = new Pipeline();
    this.actual_pipe.name = "No selected Pipeline";
    this.pipelines = [];
    this._nodes = [];
    this.activeNode = null;
    if (this.periodicNotifier) {
      this.periodicNotifier.unsubscribe();
    }
  }
  selectPipeline(pipe: Pipeline) {
    if (this.periodicNotifier) {
      this.periodicNotifier.unsubscribe();
    }
    this.actual_pipe = pipe;
    this.pipService.getNodesForPipeline(this.actual_pipe).subscribe((nodes) => {
      this._nodes = nodes;
      if (this.periodicStatus) {
        this.doPeriodicStatusUpdate();
      }
    }, err => {
      this._nodes = [];
    })
  }
  doPeriodicStatusUpdate(status: boolean = true) {
    this.periodicStatus = status;
    if (this.periodicStatus) {
      if (this.periodicNotifier) {
        this.periodicNotifier.unsubscribe();
      }
      let subs = this.pipService.checkPipelineStatus(this.actual_pipe).subscribe((data) => {
        if (this.actual_pipe.id === data.id) {
          this.actual_pipe.status = data.status;
          this.pipService.getNodesForPipeline(this.actual_pipe).subscribe((nodes) => {
            for (let nod of nodes) {
              let myNodo = this._nodes.find((val) => {
                if (val.id === nod.id)
                  return true;
                return false;
              });
              if (myNodo) {
                myNodo.setStatus(nod.status);
              }
            }
          }, err => { })
        } else {
          subs.unsubscribe();
        }
      }, err => {
        subs.unsubscribe();
      });
      this.periodicNotifier = subs;
    } else {
      if (this.periodicNotifier) {
        this.periodicNotifier.unsubscribe();
      }
    }

  }
  handleNodeClick(event: PipelineNode) {
    this.removeContextMenu()
    //If double click in less than 1 sec then set as active node
    setTimeout(() => {
      this.letItBe = false;
    }, 1000);
    if (this.activeNode === event && this.letItBe) {
      this.activeNode = event;
      const modalRef = this.modalService.open(PipelineNodeEditComponent);
      modalRef.componentInstance.node = this.activeNode;
    } else {
      this.letItBe = true;
      this.activeNode = event;
    }


  }
  /**
   * Zoom in and out from the canvas
   * @param delta 
   */
  handleZoom(delta: number) {
    this.height *= (1 + delta);
    this.width *= (1 + delta);
    this.reCalculate();
  }
  /**
   * Moves the canvas
   * @param xY 
   */
  handleMove(xY: number[]) {
    this.dx += xY[0];
    this.dy += xY[1];
  }
  /**
   * Give us the position of the mouse
   */
  handleMousePos(event) {
    if (event.evnt === 'mousemove') {
      if (this.lastX === 0 && this.lastY === 0) {

      } else {
      }
      this.registerMousePos(event.clientX, event.clientY)
    }

  }
  /**
   * Give us the position of the mouse
   */
  onMouseMove(event) {
    this.pipMouseService.sendMouseEvent({
      'name': 'mousemove',
      'x': event.clientX * this.propX,
      'y': event.clientY * this.propY
    });
    if (this.lastX === 0 && this.lastY === 0) {

    } else {
    }
    this.registerMousePos(event.clientX, event.clientY)

  }
  private registerMousePos(x: number, y: number) {
    this.lastX = x;
    this.lastY = y;
  }
  onMouseDown(event) {
    this.removeContextMenu()
    this.pipMouseService.sendMouseEvent({
      'name': 'mousedown',
      'x': event.clientX * this.propX,
      'y': event.clientY * this.propY
    });
  }
  onMouseUp(event) {
    this.pipMouseService.sendMouseEvent({
      'name': 'mouseup',
      'x': event.clientX * this.propX,
      'y': event.clientY * this.propY
    });
  }
  onMouseLeave(event) {
    this.pipMouseService.sendMouseEvent({
      'name': 'mouseleave',
      'x': event.clientX * this.propX,
      'y': event.clientY * this.propY
    });
  }
  /**
   * Moves the canvas to allow the node to be in the center
   * @param node 
   */
  focusNode(node: PipelineNode) {
    try {
      const rect = this.pipeCanvas.nativeElement.getBoundingClientRect();
      this.dx += rect.width * this.propX / 2 - this.dx - node.x - node.width / 2;
      this.dy += rect.height * this.propY / 2 - this.dy - node.y - node.height / 2;
    } catch (err) { }
  }
  newNode(temp?: PipelineNode) {
    let node: PipelineNode;
    if (temp) {
      node = new PipelineNode(temp.name, temp.tag, temp.type);
      node.inputConnectors = temp.inputConnectors;
      node.inputParams = temp.inputParams;
      node.outputConnectors = temp.outputConnectors;
      node.outputParams = temp.outputParams;
      node.errorConnectors = temp.errorConnectors;
      node.errorParams = temp.errorParams;
      node.properties = temp.properties;
      node.x = temp.x ? temp.x : 10;
      node.y = temp.y ? temp.y : 10;
    } else {
      node = new PipelineNode("New Node", Math.random().toString(), "ANY");
      node.x = 10;
      node.y = 10;
    }
    node.pipe = this.actual_pipe.id;
    const rect = this.pipeCanvas.nativeElement.getBoundingClientRect();

    if (this._nodes.length > 0)
      this.savePipelineNodes();
    console.log(node)
    this.pipService.createNodeForPipeline(node).subscribe((data) => {
    }, err => {
      this.alertService.error(err.error.message)
    });

  }
  newPipeline() {
    this.newPipe = new Pipeline();
  }
  editPipeline() {
    //PipelineEditComponent
    const modalRef = this.modalService.open(PipelineEditComponent);
    modalRef.componentInstance.pipeline = this.actual_pipe;
  }
  savePipelineNodes() {
    //this.pipService.
    let i = 0;
    this.pipService.updateNodeForPipeline(this._nodes[i]).subscribe((data) => {
      //First try with one node. If error then abort updates
      for (i = 1; i < this._nodes.length; i++) {
        this.pipService.updateNodeForPipeline(this._nodes[i]).subscribe((data) => { }, (err) => {
          this.alertService.error((err.error && err.error.message) ? err.error.message : "Cant save nodes")
        })
      }
    }, (err) => {
      this.alertService.error((err.error && err.error.message) ? err.error.message : "Cant save nodes")
    })
  }
  private reCalculate() {
    try {
      const rect = this.pipeCanvas.nativeElement.getBoundingClientRect();
      this.propX = this.height / rect.height;
      this.propY = this.width / rect.width;
    } catch (err) { }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.reCalculate();
  }
  handleContextMenu(event, node: PipelineNode) {
    let comp = ContextualMenuComponent;
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);

    let viewContainerRef = this.contextualElement.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<ContextualMenuComponent>(componentRef.instance)).node = node;

    (<ContextualMenuComponent>(componentRef.instance)).posX = event.clientX;
    (<ContextualMenuComponent>(componentRef.instance)).posY = event.clientY;
    (<ContextualMenuComponent>(componentRef.instance)).completed.subscribe((nodeEvent) => {
      this.onContextAction(nodeEvent)
    })
    event.stopPropagation();
    event.preventDefault();
  }
  removeContextMenu() {
    let viewContainerRef = this.contextualElement.viewContainerRef;
    viewContainerRef.clear();
  }
  onContextAction(event) {
    if (event && event.event) {
      switch (event.event) {
        case "paste":
          this.newNode(event.node);
          break;
        case "template":
          this.newNode(event.node);
          break;
        case "clone":
          try {
            this.newNode(event.node);
          } catch (err) { }

          break;
        case "delete":
          try {
            this.pipService.removeNodeForPipeline(event.node).subscribe((data) => { }, err => { });
          } catch (err) { }

          break;
      }
      //Is PipelineNode

    }
    this.removeContextMenu()
  }
}