import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PipelineNode } from './pipeline-node/node';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit, AfterViewInit {
  private _nodes: PipelineNode[] = [];
  /**
   * The node that is selected. Only for do changes in active node
   */
  private selectedNode: PipelineNode = null;

  /**
   * The node that we are dragging
   */
  private dragingNode: PipelineNode = null;
  /**
   * The node active, changes goes to this node
   */
  private activeNode: PipelineNode = null;
  private ctx: CanvasRenderingContext2D;
  height = 500;
  width = 500;
  radius = 40;
  @ViewChild('pipeDrawer') canvasRef: ElementRef;

  constructor() { }

  ngOnInit() {
    let aux = new PipelineNode();
    aux.name = "pipe1";
    aux.x = 50;
    aux.y = 20;
    let aux2 = new PipelineNode();
    aux2.name = "pipe2";
    aux2.x = 350;
    aux2.y = 50;
    aux.outputNodes.push(aux2);
    this._nodes.push(aux);
    this._nodes.push(aux2);
  }
  get nodes(): PipelineNode[] {
    return this._nodes;
  }
  @Input()
  set nodes(nodes: PipelineNode[]) {
    this._nodes = nodes;
  }
  ngOnChanges() {
    this.drawCanvas();
  }
  private drawCanvas() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    //Clear view
    this.ctx.clearRect(0, 0, this.width, this.height);
    //Draw only first object
    if (this._nodes.length > 0) {
      this.drawChildNodes(this.ctx, this._nodes[0]);
    }
  }
  private drawChildNodes(ctx: CanvasRenderingContext2D, graph_node: PipelineNode): void {
    //Draw Line to father
    let father = graph_node.inputNode;
    if (father) {
      ctx.moveTo(father.x, father.y);
      ctx.lineTo(graph_node.x, graph_node.y);
      ctx.stroke();
    }
    //Draw Childs
    //Output Childs
    for (let i = 0; i < graph_node.outputNodes.length; i++) {
      this.drawChildNodes(ctx, graph_node.outputNodes[i]);
    }
    //Error Childs
    for (let i = 0; i < graph_node.errorNodes.length; i++) {
      this.drawChildNodes(ctx, graph_node.errorNodes[i]);
    }
    //Draw ME
    ctx.beginPath();
    ctx.arc(graph_node.x, graph_node.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
    ctx.font = "30px Arial";
    ctx.fillText(graph_node.name, graph_node.x - this.radius, graph_node.y - 10 - this.radius);
  }
  public ngAfterViewInit() {
    this.drawCanvas();
    this.captureEvents(this.canvasRef.nativeElement as HTMLCanvasElement)
  }
  private captureEvents(canvasEl: HTMLCanvasElement) {
    Observable
      .fromEvent(canvasEl, 'mousedown')
      .subscribe((res: MouseEvent) => {
        const rect = canvasEl.getBoundingClientRect();
        // previous and current position with the offset
        console.log("------EV0: " + res.type)
        this.selectedNode = this.selectNodeInPos({
          x: res.clientX - rect.left,
          y: res.clientY - rect.top
        });
        Observable
          // after a mouse down, we'll record all mouse moves
          .fromEvent(canvasEl, 'mousemove')
          // we'll stop (and unsubscribe) once the user releases the mouse
          // this will trigger a 'mouseup' event    
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseleave'))
          // pairwise lets us get the previous value to draw a line from
          // the previous point to the current point    
          .pairwise()
          .subscribe((res: [MouseEvent, MouseEvent]) => {
            const rect = canvasEl.getBoundingClientRect();
            // previous and current position with the offset
            //console.log("EV0: " + res[0].type + "  EV1: " + res[1].type)
            const prevPos = {
              x: res[0].clientX - rect.left,
              y: res[0].clientY - rect.top
            };
            console.log("Rect: " + rect.left + " " +rect.top)
            if(this.selectedNode){
              console.log("Node: " + this.selectedNode.x + " " +this.selectedNode.y)
            }
            
            const currentPos = {
              x: res[1].clientX - rect.left,
              y: res[1].clientY - rect.top
            };
            console.log("POS CLIENT: " + res[1].clientX + " " + res[1].clientY)
            if (res[1].type === "mouseup" || res[1].type === "mouseleave") {
              this.selectedNode = null;
            }
            if (this.selectedNode && res[0].type === "mousemove" && res[1].type === "mousemove" ) {
              this.selectedNode.x = currentPos.x;
              this.selectedNode.y = currentPos.y;
              this.drawCanvas();
            }
            //this.drawOnCanvas(prevPos, currentPos);
          });
        //this.drawOnCanvas(prevPos, currentPos);
      });
  }
  /**
   * Selects a pipeline Node using x,y position
   * @param pos 
   */
  private selectNodeInPos(pos: { x: number, y: number }) {
    for (let i = 0; i < this._nodes.length; i++) {
      if (this.nodeInPosition(this._nodes[i], pos)) {
        return this._nodes[i];
      }
    }
    return null;
  }
  /**
   * Check if a node is in a certain position
   * @param node 
   * @param pos 
   */
  private nodeInPosition(node: PipelineNode, pos: { x: number, y: number }) {
    if (Math.sqrt(
      Math.pow(Math.abs(node.x - pos.x), 2)
      +
      Math.pow(Math.abs(node.y - pos.y), 2)
    ) < this.radius
    ) {
      return true;
    } else {
      return false;
    }
  }


  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {
    // incase the context is not set
    if (!this.ctx) { return; }




    // start our drawing path
    this.ctx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.ctx.moveTo(prevPos.x, prevPos.y); // from
      // draws a line from the start pos until the current position
      this.ctx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.ctx.stroke();
    }
  }
}