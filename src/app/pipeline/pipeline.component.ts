import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { PipelineNode, NodeConnector, IO_TYPES, PIPE_TAGS } from './node';
import { HosePipe, HosePipeService } from './hose-pipe.service';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { PipelineMouseService } from './pipeline-mouse.service'
import { PipelineService } from './pipeline.service'
import { Pipeline } from './pipeline';
import { AlertService } from '../alert/alert.service'
@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit, AfterViewInit {
  private _nodes: PipelineNode[] = [];
  private pipelines: Pipeline[] = [];
  private actual_pipe: Pipeline = null;
  private newPipe: Pipeline = null;
  /**
   * The node that is selected. Only for do changes in active node
   */
  private selectedNode: PipelineNode = null;
  private letItBe: boolean = true;
  private hosePipe: HosePipe;
  /**
   * The node active, changes goes to this node
   */
  private activeNode: PipelineNode = null;
  height = 1280;
  width = 2048;
  radius = 40;
  propX = 1;
  propY = 1;
  dx = 0;
  dy = 0;
  lastX: number = 0;
  lastY: number = 0;
  @ViewChild('pipeCanvas') public pipeCanvas: ElementRef;
  constructor(
    private hosePipeService: HosePipeService,
    private pipMouseService: PipelineMouseService,
    private pipService: PipelineService,
    private alertService: AlertService) {
    this.hosePipe = this.hosePipeService.getHosePipe();
  }
  ngAfterViewInit() {
    try {
      this.reCalculate()
    } catch (err) { }

  }
  ngOnInit() {
    this.reCalculate()
    this.pipService.findPipelines().subscribe((pipes) => {
      this.pipelines = pipes;
    }, err => {

    })
    this.pipService.subscribeToPipelines().subscribe((data) => {
      this.pipService.findPipelines().subscribe((data) => {
        this.pipelines = data;
        this.pipService.getNodesForPipeline(this.actual_pipe.id).subscribe((data) => {
          this._nodes = data;
        })
      })

    }, err => { })
  }
  get nodes(): PipelineNode[] {
    return this._nodes;
  }
  @Input()
  set nodes(nodes: PipelineNode[]) {
    this._nodes = nodes;
  }
  handleNodeClick(event: PipelineNode) {
    //If double click in less than 1 sec then set as active node
    setTimeout(() => {
      this.letItBe = false;
    }, 1000);
    if (this.selectedNode === event && this.letItBe) {
      this.activeNode = event;
      this.selectedNode = null;
    } else {
      if (this.activeNode === event) {
        this.activeNode = null
      }
      this.selectedNode = event;
      this.letItBe = true;

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
      console.log("Mouse move")
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
      this.selectedNode = node;
    } catch (err) { }
  }
  newNode() {
    let node = new PipelineNode("New Node", Math.random().toString(), "ANY");
    node.pipe = this.actual_pipe.id;
    const rect = this.pipeCanvas.nativeElement.getBoundingClientRect();
    node.x = rect.width * this.propX / 2 - this.dx
    node.y = rect.height * this.propY / 2 - this.dy
    this.pipService.createNodeForPipeline(node).subscribe((data) => {
      console.log(data)
    }, err => {
      this.alertService.error(err.error.message)
    });

  }
  newPipeline() {
    this.newPipe = new Pipeline();
  }
  savePipelineNodes() {
    //this.pipService.
    for (let i = 0; i < this._nodes.length; i++) {
      this.pipService.updateNodeForPipeline(this._nodes[i]).subscribe((data) => { }, (err) => {
        this.alertService.error((err.error && err.error.message) ? err.error.message : "Cant save nodes")
      })
    }
  }
  selectPipeline(pipe: Pipeline) {
    this.actual_pipe = pipe;
    this.pipService.getNodesForPipeline(this.actual_pipe.id).subscribe((nodes) => {
      this._nodes = nodes;
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
}